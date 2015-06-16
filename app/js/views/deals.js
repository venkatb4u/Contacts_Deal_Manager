define([
    'jquery',
    'underscore',
    'backbone',
    'models/model',
    'collections/collection',
    'views/deal'
], function($, _, Backbone, Model, Collection, DealView) {
    'use strict';

    var dealsPlatform = Backbone.View.extend({

        el: '#tabDeals', // el attaches to existing element        

        model: new Model(),

        events: {
            'click .deal.add': 'addDeal'
        },

        initialize: function(router) {
            var self = this;
            this.router = router;
            _.bindAll(this, 'render', 'addDeal', 'appendDeal'); // every function that uses 'this' as the current object should be in here
            this.collection = new Collection();
            this.collection.bind('add', this.appendDeal); // collection event binder
            this.collection.bind('remove', function() {
                console.log('model removed from the collection');
            });
            this.counter = 0;
            this.render();

        },

        render: function() {
            var self = this;
            _(this.collection.models).each(function(dealModel) { // in case collection is not empty
                self.appendDeal(dealModel);
            }, this);
        },
        addDeal: function(e) {
            if (this.$el.find('.editMode').length) {
                this.$el.find('.editMode').find('.oldPrice').focus();
                alert("Please save the edited deal before creating another...!");
                return;
            }
            this.counter++;
            var model = new Model();
            this.collection.add(model);
            e.preventDefault();
        },
        appendDeal: function(dealModel) {
            var dealView = new DealView({
                model: dealModel,
                collection: this.collection
            });
            $(dealView.render().el).insertBefore(this.$el.find('.add'));
        }
    });

    return dealsPlatform;
});