define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/model',
    'text!templates/options.html'
], function($, _, Backbone, Handlebars, Model, OptionsHbs) {
    'use strict';

    var HomeView = Backbone.View.extend({

        tagName: "ul",

        templateFileName: "options.html",

        model: new Model(),

        template: Handlebars.compile(OptionsHbs), //template handling using Handlebar

        events: {
            "change input": function() {
                $("#tabBody > div").toggleClass("hide");
            }
        },

        initialize: function(router) {
            var self = this;
            this.router = router;
            this.render();
        },

        render: function() {
            var self = this,
                optionsData = {
                    categories: [{
                        id: "contacts",
                        isselected: true,
                        title: "Contacts"
                    }, {
                        id: "deals",
                        title: "Deals"
                    }]
                };

            this.$el.html(this.template(optionsData));

            return this; // for chainable calls, like .render().el
        }
    });

    return HomeView;
});