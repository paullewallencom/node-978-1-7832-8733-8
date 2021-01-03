var http = require('http');
var router = require('./router');
var responder = require('./responder');

/* Database related */

var crypto = require("crypto"),
    client = require('mongodb').MongoClient,
	mongodb_host = "127.0.0.1",
	mongodb_port = "27017",
	collection;

var connection = 'mongodb://';
connection += mongodb_host + ':' + mongodb_port;
connection += '/library';
client.connect(connection, function(err, database) {
	if(err) {
		throw new Error("Can't connect.");
	} else {
		console.log("Connection to MongoDB server successful.");
  		collection = database.collection('books');
  	}
});

/* Routes */

router.post(/\/book/, function(req, res, info) {
	var book = info.post;
	book.ID = crypto.randomBytes(20).toString('hex');
	if(typeof book.name == 'undefined') {
		responder(res).code(400).json({error: 'Missing name.'});
	} else if(typeof book.author == 'undefined') {
		responder(res).code(400).json({error: 'Missing author.'});
	} else {
		collection.insert(book, {}, function() {
			responder(res).code(201).json({message: 'Record created successfully.'});	
		});	
	}
});

router.put(/\/book\/(.+)?/, function(req, res, info) {
	var book = info.post;
	if(typeof book.name === 'undefined') {
		responder(res).code(400).json({error: 'Missing name.'});
	} else if(typeof book.author === 'undefined') {
		responder(res).code(400).json({error: 'Missing author.'});
	} else {
		var ID = info.match[1];
		collection.find({ID: ID}).toArray(function(err, records) {
			if(records && records.length > 0) {
				book.ID = ID;
				collection.update({ID: ID}, book, {}, function() {
					responder(res).code(200).json({message: 'Record updated successfully.'});
			    });
			} else {
				responder(res).code(400).json({error: 'Missing record.'});		
			}
		});
	}
});

router.del(/\/book\/(.+)?/, function(req, res, info) {
	var ID = info.match[1];
	collection.find({ID: ID}).toArray(function(err, records) {
		if(records && records.length > 0) {
			collection.findAndModify({ID: ID}, [], {}, {remove: true}, function() {
				responder(res).code(200).json({message: 'Record removed successfully.'});
		    });
		} else {
			responder(res).code(400).json({error: 'Missing record.'});		
		}
	});
});

router.get(/\/books/, function(req, res, info) {
	res.end('Getting all the books'); return;
	collection.find({}).toArray(function(err, records) {
		if(!err) {
			responder(res).code(200).json(records);
		} else {
			responder(res).code(200).json([]);
		}
	});
});

router.all('', function(req, res, info) {
	var html = '';
	html += 'Available methods:<br />';
	html += '<ul>';
	html += '<li>GET /books</li>';
	html += '<li>POST /book</li>';
	html += '<li>PUT /book/[id]</li>';
	html += '<li>DELETE /book/[id]</li>';
	html += '</ul>';
	responder(res).code(200).html(html);
});

http.createServer(router.process).listen('9000', '127.0.0.1');
console.log('API listening');