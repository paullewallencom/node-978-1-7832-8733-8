App = Ember.Application.create();
App.Router.map(function() {
	this.resource('social-feed', { path: '/' }, function() {
		this.route("tweets", { path: '/tweets/:handle' });
	});
});

App.SocialFeedIndexController = Ember.Controller.extend({
	handle: '',
	actions: {
		getTweets: function() {
			if(this.get('handle') !== '') {
				window.location.href = "#/tweets/" + this.get('handle');
				this.set('handle', '');
			} else {
				alert("Please type a Twitter handle.");
			}
		}
	}
});

App.SocialFeedIndexView = Ember.View.extend({
	didInsertElement: function() {
		this.$('input').focus();
	}
});

App.SocialFeedTweetsRoute = Ember.Route.extend({
	model: function(params) {
		this.set('handle', params.handle);
		return Ember.$.getJSON('/tweets/' + params.handle);
	},
	setupController: function(controller, model) {
		controller.set("model", model);
        controller.set("handle", this.get('handle'));
    }
});

App.SocialFeedTweetsController = Ember.ArrayController.extend({
	handle: '',
	formattedHandle: function() {
		return "<a href='http://twitter.com/" + this.handle + "'>@" + this.handle + '</a>';
	}.property('handle')
});

Ember.Handlebars.registerBoundHelper('formatTweet', function(value) {
	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return new Handlebars.SafeString(value.replace(exp, "<a href='$1'>$1</a>"));
});