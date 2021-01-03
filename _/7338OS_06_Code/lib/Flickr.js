var open = require('open');
var http = require('http');
var url = require('url');
var Flapi = require('flapi');
var flapiClient;
var filesToOpen;
var done;
var options;

var runServer = function(callback) {
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		var urlParts = url.parse(req.url, true);
		var query = urlParts.query;
		if(query.oauth_token) {
			flapiClient.getUserAccessToken(query.oauth_verifier, function(result) {
				options.oauth_token = result.oauth_token;
				options.oauth_token_secret = result.oauth_token_secret;
				var message = '';
				for(var prop in result) {
					message += prop + ' = ' + result[prop] + '<br />';
				}
				res.end(message);
				uploadPhotos();
			});
		} else {
			res.end('Missing oauth_token parameter.');
		}
	}).listen(3000, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:3000/');
	callback();
}

var uploadPhotos = function() {
	if(filesToOpen.length == 0) {
		done();
	} else {
		var file = filesToOpen.shift();
		console.log("Uploading " + file.replace(/\//g, '\\').replace(process.cwd(), ''));
		flapiClient.api({
			method: 'upload',
			params:  { photo : file },
			accessToken : { 
				oauth_token: options.oauth_token,
				oauth_token_secret: options.oauth_token_secret
			},
			next: function(data){
		  		uploadPhotos();
			}
		});
	}
}

var createFlapiClient = function(){
	flapiClient = new Flapi(options);
	if(!options.oauth_token) {
		flapiClient.authApp('http://127.0.0.1:3000', function(oauthResults){
			runServer(function() {
				open(flapiClient.getUserAuthURL());
			});
		});
	} else {
		uploadPhotos();
	}
};

module.exports = function(opts, files, callback) {
	options = opts;
	filesToOpen = files;
	done = callback;
	createFlapiClient();
}