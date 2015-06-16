define([
    'jquery',
    'underscore',
    'backbone',
    'models/model',
    'collections/collection',
    'views/contact'
], function($, _, Backbone, Model, Collection, ContactView) {
    'use strict';

    var ContactsPlatform = Backbone.View.extend({

        el: '#tabContacts', // el attaches to existing element        

        model: new Model(),

        events: {
            'click .contact.add': 'addContact'
        },

        initialize: function(router) {
            var self = this;
            this.router = router;
            _.bindAll(this, 'render', 'addContact', 'appendContact'); // every function that uses 'this' as the current object should be in here
            this.collection = new Collection();
            this.collection.bind('add', this.appendContact); // collection event binder
            this.collection.bind('remove', function() {
                console.log('model removed from the collection');
            });
            this.counter = 0;
            this.render();

        },

        render: function() {
            var self = this;
            _(this.collection.models).each(function(contactModel) { // in case collection is not empty
                self.appendContact(contactModel);
            }, this);
        },
        addContact: function(e) {
            if (this.$el.find('.editMode').length) {
                this.$el.find('.editMode').find('.name').focus();
                alert("Please save the edited contact before creating another...!");
                return;
            }
            this.counter++;
            var model = new Model();

            this.collection.add(model);
            e.preventDefault();
        },
        appendContact: function(contactModel) {
            var contactView = new ContactView({
                model: contactModel,
                collection: this.collection
            });
            $(contactView.render().el).insertBefore(this.$el.find('.add'));
        }
    });

    return ContactsPlatform;
});