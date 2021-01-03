var http = require('http'),
	fs = require('fs'),
	port = 3000,
	files = [],
	debug = true;

var Twit = require('twit');
var T = new Twit({
	consumer_key: '4v8nIz6JdIp7P3HgkA39hzoU2',
	consumer_secret: 'IM0GBz1gwKr5KuywnUbjnWVzXY1VV2pY9uEqhtZ2Oz1Qkzdu5B',
	access_token: '130462642-7M3dow5fB0wDTN0bzn7KdiGo2EJBasK6gDkckIEi',
	access_token_secret: '16VlHNzfwcjtC6OkAXKvxuPRCerjMAlNoyxGs0sPh3mDd'
});
var numOfTweets = 10;

var respond = function(file, res) {
	var contentType;
	switch(file.ext) {
    case "css": contentType = "text/css"; break;
		case "html": contentType = "text/html"; break;
		case "js": contentType = "application/javascript"; break;
		case "ico": contentType = "image/ico"; break;
		default: contentType = "text/plain";
	}
	res.writeHead(200, {'Content-Type': contentType});
	res.end(file.content);
}
var serveAssets = function(req, res) {
	var file = req.url === '/' ? 'html/page.html' : req.url;
	if(!files[file] || debug) {
		try {
			files[file] = {
				content: fs.readFileSync(__dirname + "/" + file),
				ext: file.split(".").pop().toLowerCase()
			}
		} catch(err) {
			res.writeHead(404, {'Content-Type': 'plain/text'});
			res.end('Missing resource: ' + file);
			return;
		}
	}
	respond(files[file], res);
}

var app = http.createServer(function (req, res) {
	if(req.url.indexOf("/tweets/") === 0) {
		var handle = req.url.replace("/tweets/", "");
		T.get("statuses/user_timeline", { screen_name: handle, count: numOfTweets }, function(err, reply) {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(reply));
		});
	} else {
		serveAssets(req, res);
	}
}).listen(port, '127.0.0.1');
console.log("Server listening on port " + port);