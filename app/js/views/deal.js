define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/collection',
    'models/model',
    'text!templates/deal.html',
    'text!templates/editDeal.html'
], function($, _, Backbone, Handlebars, Collection, Model, dealHbs, editDealHbs) {
    'use strict';

    var DealView = Backbone.View.extend({

        templateFileName: "deal.html",

        className: "deal editMode",

        tagName: 'article',

        model: new Model(),

        template: Handlebars.compile(editDealHbs), //template handling using Handlebar

        events: {
            'click .delete': 'destroyDeal',
            'click .edit': 'editDeal',
            'submit form': 'saveDeal',
            'click .plus': 'addLabel',
            'click .remove': 'removeLabel'
        },

        initialize: function(router) {
            var self = this;
            this.router = router;
            this.listenTo(this.model, 'destroy', this.remove);
            Handlebars.registerPartial("DealHbs", dealHbs); // EditMode template  
            this.model.on('change', function() {
                self.updateView(); // Data-binding
            });
        },

        render: function() {
            var self = this;

            this.$el.html(this.template(this.model.attributes));

            return this; // for chainable calls, like .render().el
        },

        updateView: function() {
            $(this.el).run("DealHbs", this.model.attributes).removeClass("editMode");
        },

        addLabel: function(e) {
            var target = $(e.currentTarget),
                label = target.closest('li'),
                cloneDOM = label.clone().find('input').val('').end();
            cloneDOM.removeClass('mandatory').insertAfter(label);
        },

        removeLabel: function(e) {
            var target = $(e.currentTarget);
            target.closest('li').remove();
        },

        destroyDeal: function(e) {
            this.collection.remove(this.model);
            this.model.destroy();
            e.stopPropagation();
        },

        editDeal: function(e) {
            var status = this.$el.find('#status'),
                data = {
                    props: {
                        oldprice: this.$el.find('.oldPrice').text().split(".")[1],
                        newprice: this.$el.find('.newPrice').text().split(".")[1],
                        status: status.hasClass("open") ? "open" : (status.hasClass("new") ? "new" : "closed"),
                        contacts: $.makeArray(this.$el.find('.contact').map(function() {
                            return $(this).text();
                        }))
                    }
                };
            this.$el.html(this.template(data)).addClass("editMode");
            e.stopPropagation();
        },

        saveDeal: function(e) {
            var updatedData = {
                props: {
                    oldprice: this.$el.find('.oldPrice').val(),
                    newprice: this.$el.find('.newPrice').val(),
                    status: this.$el.find('#status').val(),
                    contacts: $.makeArray(this.$el.find('.contact').map(function() {
                        return $(this).val();
                    }))
                }
            };
            this.model.save(updatedData, {
                patch: true
            });
            return false;
        },

        remove: function(e) { // Data binding -  whenever model is deleted/destroyed, DOM elem also gets removed.
            this.$el.remove();
        }
    });

    return DealView;
});