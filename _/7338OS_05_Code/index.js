var http = require('http'),
	fs = require('fs'),
	files = {},
	debug = true,
	port = 3000;

var todos = [],
	ids = 0;

var addToDo = function(data) {
	data.id = ++ids;
	todos.push(data);
	return data;
}
var deleteToDo = function(id) {
	var arr = [];
	for(var i=0; i<todos.length; i++) {
		if(todos[i].id != parseInt(id)) {
			arr.push(todos[i]);
		}
	}
	todos = arr;
}
var editToDo = function(id, data) {
	for(var i=0; i<todos.length; i++) {
		if(todos[i].id == parseInt(id)) {
			todos[i].text = data.text;
			todos[i].done = data.done;
			return todos[i];
		}
	}
}
var processPOSTRequest = function(req, callback) {
	var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        callback(JSON.parse(body));
    });
}
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
var respondJSON = function(json, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(json));	
}
var serveToDos = function(req, res) {
	if(req.url.indexOf('/api/all') === 0) {
		respondJSON(todos, res);
	} else if(req.url.indexOf('/api/todo') === 0) {
		if(req.method == 'POST') {
			processPOSTRequest(req, function(data) {
				respondJSON(addToDo(data), res);
			});
		} else if(req.method == 'DELETE') {
			deleteToDo(req.url.split("/").pop());
			respondJSON(todos, res);
		} else if(req.method == 'PUT') {
			processPOSTRequest(req, function(data) {
				respondJSON(editToDo(req.url.split("/").pop(), data), res);
			});
		}
	} else {
		respondJSON({error: 'Missing method'}, res);
	}
}
var app = http.createServer(function (req, res) {
	if(req.url.indexOf('/api') === 0) {
		serveToDos(req, res);
	} else {
		serveAssets(req, res);
	}	
}).listen(port, '127.0.0.1');
console.log("Listening on 127.0.0.1:" + port);

addToDo({text: "Learn JavaScript", done: false});
addToDo({text: "Learn Node.js", done: false});
addToDo({text: "Learn BackboneJS", done: false});