require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: 'vendor/jquery-min',
    underscore: 'vendor/underscore-min',
    backbone: 'vendor/backbone-min',
    text: 'vendor/require/text',
    templates: '../templates'
  }
});

require([
  'app'

], function(App){
  App.initialize();
});