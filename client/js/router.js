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
      app_router.bind("all",function(route, router) {
          $.ajax({
              url: '/loggedin'
          }).done(function(d){
              if (d === "0") {
                  app_router.navigate('/login', { trigger: true });
              } else {
                  app_router.navigate('/', { trigger: true });
              }
          });
      });

      Backbone.history.start();
    };

  return {
    initialize: initialize,
    router: app_router
  };
});