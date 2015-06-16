define([

    'jquery',
    'backbone',
    'globals',
    'views/options',
    'views/contacts',
    'views/deals'
], function($, Backbone, Global, Options, Contacts, Deals) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "homepage" // instantiates Options view only for home page 
        },
        initialize: function(Header, Footer) {
            new Header();
            new Footer();
        },
        homepage: function() {
            this.optionview = new Options(this); //passing 'this' router instance            
            $('#appOptions').html(this.optionview.el);

            new Contacts(); // triggering Contacts view
            new Deals(); // triggering Deals view
        }
    });


    return AppRouter;

});