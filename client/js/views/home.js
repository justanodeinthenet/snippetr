define([
  'jquery',
  'underscore',
  'backbone',
  //Main template for this view
  'text!templates/home.html'
], function($, _, Backbone, homeMainTemplate){

	var homeView = Backbone.View.extend({
		el: $('body'),
		initialize: function(){
		},
		render: function(){
			var data = {};
			//We can add some data to the template here if needed
			// this.$el.html( _.template( homeMainTemplate, data ) );
		}
	});

  return new homeView;
});