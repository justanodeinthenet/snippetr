define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/login.html'
], function($, _, Backbone, Router, viewTemplate) {
  console.log(Router)
  var loginView = Backbone.View.extend({
      el: $('body'),
      initialize: function(){
      },
      events: {
        "click #login": "performLogin"
      },
      performLogin: function(){
        $.post('/login', {username: $('input[name=username]').val(), password: $('input[name=password]').val()}, function(data) {
          /* Login and go to #home */
          // Router.router.navigate('/', { trigger: true });
        });
        return false;
      },
      render: function(){
        this.$el.html(viewTemplate);
        return this;
      }
  });

  return new loginView;
});