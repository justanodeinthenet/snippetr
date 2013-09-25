define([
  'jquery',
  'underscore',
  'backbone',
  'views/home',
  'views/login'
], function($, _, Backbone, homeView, loginView){

    var AppRouter = Backbone.Router.extend({
        routes: {
            'login': 'login',
            '': 'home'
        },

        login: function() {
            loginView.render();
        },
        home: function() {
            homeView.render();
        }
    });

    var app_router = new AppRouter();

    var initialize = function(){
      Backbone.history.start();
    };

  return {
    initialize: initialize,
    router: app_router
  };
});