define(['jquery', 'backbone', 'models/model'], function($, Backbone, PodModel) {

    var Collection = Backbone.Collection.extend({

        model: PodModel
            // url:'app/data/deals.json',
            // parse:function(data){
            // 	return data.deals;
            // }
    });

    return Collection;
});