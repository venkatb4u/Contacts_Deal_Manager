define([
    'jquery',
    'underscore',
    'handlebars',
    'backbone',
    'models/model',
    'text!templates/header.html'
], function($, _, Hbs, Backbone, Model, headerHbs) {
    'use strict';

    var HeaderView = Backbone.View.extend({

        el: '#pageHead', // el attaches to existing element

        templateFileName: "header.html",

        template: Hbs.compile(headerHbs), //template handling using Handlebar

        model: new Model(),

        events: {

        },

        initialize: function() {
            var self = this;
            this.headerData = {
                id: "header",
                props: {
                    isloggedin: true,
                    username: "Venkat",
                    title: "CRM -- Contacts/Deals Management"
                }
            };


            this.render();

            this.model.on('change', function() {
                self.render();
            });
        },

        render: function() {
            this.$el.html(this.template(this.headerData));
            return this; // for chainable calls, like .render().el
        }
    });

    return HeaderView;
});