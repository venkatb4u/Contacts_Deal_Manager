'use strict';

require(["config"], function() {
    require([
            'backbone',
            'views/header',
            'views/footer',
            'router/router'
        ],
        function(Backbone, Header, Footer, AppRouter) {
            new AppRouter(Header, Footer);
            Backbone.history.start();
        });
});