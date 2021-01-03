var crypto = require("crypto"),
    type = "mysql",
    // mongodb
    client = require('mongodb').MongoClient,
	mongodb_host = "127.0.0.1",
	mongodb_port = "27017",
	collection,
    // mysql
    mysql = require('mysql'),
    mysql_host = "127.0.0.1",
    mysql_user = "root",
    mysql_password = "",
    mysql_database = "nodejsblueprints",
    connection;
    
module.exports = function() {
    if(type == "mongodb") {
        connection = 'mongodb://';
        connection += mongodb_host + ':' + mongodb_port;
        connection += '/blog-application';
        client.connect(connection, function(err, database) {
        	if(err) {
        		throw new Error("Can't connect.");
        	} else {
        		console.log("Connection to MongoDB server successful.");
          		collection = database.collection('articles');
          	}
        });
        return {
        	add: function(data, callback) {
                var date = new Date();
                data.id = crypto.randomBytes(20).toString('hex');
        		data.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        		collection.insert(data, {}, callback || function() {});
        	},
        	update: function(data, callback) {
    			collection.update(
                    {"id": data.id}, 
                    {text: data.text, title: data.title, id: data.id},
                    {}, 
                    callback || function(){ }
                );        
            },
            get: function(callback) {
                collection.find({}).toArray(function(err, rows) {
                    callback(rows)
                });
            },
            remove: function(id, callback) {
                collection.findAndModify(
                    {id: id}, 
                    [], 
                    {}, 
                    {remove: true}, 
                    callback
                );
            }
        }
    } else {
        connection = mysql.createConnection({
            host: mysql_host,
            user: mysql_user,
            password: mysql_password
        });
        connection.connect(function(err) {
            if(err) {
                throw new Error("Can't connect to MySQL server.");
            } else {
                connection.query("USE " + mysql_database, function(err, rows, fields) {
                    if(err) {
                        throw new Error("Missing database.");
                    } else {
                        console.log("Successfully selected database.");
                    }
                })
            }
        });
        return {
            add: function(data, callback) {
                var date = new Date();
                var query = "";
                query += "INSERT INTO articles (title, text, date) VALUES (";
                query += connection.escape(data.title) + ", ";
                query += connection.escape(data.text) + ", ";
                query += "'" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "'";
                query += ")";
                connection.query(query, callback);
            },
            update: function(data, callback) {
                var query = "UPDATE articles SET ";
                query += "title=" + connection.escape(data.title) + ", ";
                query += "text=" + connection.escape(data.text) + " ";
                query += "WHERE id='" + data.id + "'";
                connection.query(query, callback);
            },
            get: function(callback) {
                var query = "SELECT * FROM articles ORDER BY id DESC";
                connection.query(query, function(err, rows, fields) {
                    if(err) {
                        throw new Error("Error getting rows from 'articles'");
                    } else {
                        callback(rows);
                    }
                });
            },
            remove: function(id, callback) {
                var query = "DELETE FROM articles WHERE id='" + id + "'";
                connection.query(query, callback);
            }
        }
    }
}