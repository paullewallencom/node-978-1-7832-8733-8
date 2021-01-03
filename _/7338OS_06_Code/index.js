#!/usr/bin/env node

var flickrOptions = {
	oauth_consumer_key: "1db8ba1ab27c73f4997b099ad03744cb",
	oauth_consumer_secret: "4d4b9398d7e235a9",
  	// oauth_token: '',
  	// oauth_token_secret: '',
	perms: 'write'
};

var flickr = require('./lib/Flickr');
var files = require('./lib/Files');

files(function(images) {
	flickr(flickrOptions, images, function() {
		console.log("All the images uploaded.");
		process.exit(1);
	})
});