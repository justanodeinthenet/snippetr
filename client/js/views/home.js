define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home.html'
],

function($, _, Backbone, homeMainTemplate){

  var homeView = Backbone.View.extend({
    el: $('body'),
    initialize: function(){
    },
    events: {
      "click #search": "performSearch",
      "click #submit": "submit",
      "click #list": "list"
    },
    performSearch: function (){
      $.get('/logout', function(data) {
        Backbone.history.navigate('/login', { trigger: true });
      });
    },
    list: function (){
      $.get('/api/snippets', function(data) {
        Backbone.history.navigate('/login', { trigger: true });
      });
    },
    submit: function (){
      var title = $('input[name=title]').val(),
          body = $('input[name=body]').val();
      $.post('/api/snippets/add', { title: title, body: body }, function(data) {
        // Backbone.history.navigate('/', { trigger: true });
      });
      return false;
    },
    render: function(){
        // var data = {};
        this.$el.html(homeMainTemplate);
    }
  });

  return new homeView;
});