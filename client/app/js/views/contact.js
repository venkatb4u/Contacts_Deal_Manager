define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'collections/collection',
    'models/model',
    'text!templates/contact.html',
    'text!templates/editContact.html'
], function($, _, Backbone, Handlebars, Collection, Model, contactHbs, editContactHbs) {
    'use strict';

    var ContactView = Backbone.View.extend({

        templateFileName: "contact.html",

        className: "contact editMode",

        tagName: 'article',

        model: new Model(),

        template: Handlebars.compile(editContactHbs), //template handling using Handlebar

        events: {
            'click .delete': 'destroyContact',
            'click .edit': 'editContact',
            'submit form': 'saveContact',
            'click .plus': 'addLabel',
            'click .remove': 'removeLabel'
        },

        initialize: function(router) {
            var self = this;
            this.router = router;
            this.listenTo(this.model, 'destroy', this.remove);
            Handlebars.registerPartial("ContactHbs", contactHbs); // EditMode template  
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
            $(this.el).run("ContactHbs", this.model.attributes).removeClass("editMode");
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

        destroyContact: function(e) {
            this.collection.remove(this.model);
            this.model.destroy();
            e.stopPropagation();
        },

        editContact: function(e) {
            var data = {
                props: {
                    name: this.$el.find('.name').text(),
                    mobile: $.makeArray(this.$el.find('.mobile').map(function() {
                        return $(this).text();
                    })),
                    email: $.makeArray(this.$el.find('.email').map(function() {
                        return $(this).text();
                    }))
                }
            };
            this.$el.html(this.template(data)).addClass("editMode");
        },

        saveContact: function(e) {
            var updatedData = {
                props: {
                    name: this.$el.find('.name').val(),
                    mobile: $.makeArray(this.$el.find('.mobile').map(function() {
                        return $(this).val();
                    })),
                    email: $.makeArray(this.$el.find('.email').map(function() {
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

    return ContactView;
});