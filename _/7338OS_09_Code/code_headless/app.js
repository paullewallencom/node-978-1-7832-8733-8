var http = require('http');
var url = require('url');
var port = 3000;
var pageA = '\
	<h1>First page</h1>\
	<form>\
		<input type="text" name="title" />\
		<input type="submit" />\
	</form>\
';
var pageB = '\
	<h1>{title}</h1>\
	<a href="/">back</a>\
';
http.createServer(function (req, res) {
	var urlParts = url.parse(req.url, true);
	var query = urlParts.query;
	res.writeHead(200, {'Content-Type': 'text/html'});
	if(query.title) {
		res.end(pageB.replace('{title}', query.title));
	} else {
		res.end(pageA);
	}
}).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + port);