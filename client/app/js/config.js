// A simple runtime configuration file.  
require.config({
    paths: {
        jquery: '../../vendor/jquery/jquery-1.10.0.min',     
        templates: '../templates',
        underscore: '../../vendor/templateLibs/underscore-min',
        handlebars: '../../vendor/templateLibs/handlebars',
        backbone: '../../vendor/backboneLibs/backbone-min',      
        globals:'globals',
        text: '../../vendor/requireLibs/text'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone :{
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }

    }
});

