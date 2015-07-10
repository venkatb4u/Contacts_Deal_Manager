define([
    'jquery',
    'underscore',
    'handlebars',
    'backbone',
    'text!templates/footer.html'
], function($, _, Hbs, Backbone, footerHbs) {


    var FooterView = Backbone.View.extend({

        el: '#pageFoot', // el attaches to existing element

        templateFileName: "footer.html",
        template: Hbs.compile(footerHbs), //template handling using Handlebar,

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            return this;
        }
    });

    return FooterView;
});