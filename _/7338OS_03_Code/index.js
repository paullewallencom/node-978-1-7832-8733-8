var express = require('express');
var app = express();
var articles = require("./models/Articles")();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.set("username", "admin");
app.set("password", "pass");
app.use(express.cookieParser('blog-application'));
app.use(express.session());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    req.articles = articles;
    next();
});
app.use(function(req, res, next) {
    if((
        req.session && 
        req.session.admin === true
    ) || (
        req.body &&
        req.body.username === app.get("username") &&
        req.body.password === app.get("password")
    )) {
        req.logged = true;
        req.session.admin = true;
    };
    next();
});

var protect = function(req, res, next) {
    if(req.logged) {
        next();
    } else {
        res.send(401, 'No Access.');
    }
}

app.get('/api/get', require("./controllers/api/get"));
app.post('/api/add', protect, require("./controllers/api/add"));
app.post('/api/edit', protect, require("./controllers/api/edit"));
app.post('/api/delete', protect, require("./controllers/api/delete"));
app.all('/admin', require("./controllers/admin"));
app.get('/', require("./controllers/index"));

app.listen(3000);
console.log('Listening on port 3000');