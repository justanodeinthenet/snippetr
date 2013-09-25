define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/login.html'
], function($, _, Backbone, loginTemplate) {
  var loginView = Backbone.View.extend({
      el: $('body'),
      initialize: function(){
      },
      events: {
        "click #login": "performLogin"
      },
      performLogin: function(){
        var username = $('input[name=username]').val(),
            password = $('input[name=password]').val();

        $.post('/login', {username: username, password: password}, function(data) {
          Backbone.history.navigate('/', { trigger: true });
        });
        return false;
      },
      render: function(){
        this.$el.html(loginTemplate);
        return this;
      }
  });

  return new loginView;
});