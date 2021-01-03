var routes = [];

var url = require('url');
var qs = require('querystring');
var processRequest = function(req, callback) {
	var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        callback(qs.parse(body));
    });
}

module.exports = {
	register: function(method, route, handler) {
		routes.push({ method: method, route: route, handler: handler });
	},
	get: function(route, handler) { 
		this.register('GET', route, handler); 
	},
	post: function(route, handler) { 
		this.register('POST', route, handler); 
	},
	put: function(route, handler) { 
		this.register('PUT', route, handler); 
	},
	del: function(route, handler) { 
		this.register('DELETE', route, handler); 
	},
	all: function(route, handler) { 
		this.register('', route, handler); 
	},
	process: function(req, res, next) {
		var urlInfo = url.parse(req.url, true);
		var info = {
			get: urlInfo.query,
			post: {},
			path: urlInfo.pathname,
			method: req.method
		}
		for(var i=0; i<routes.length; i++) {
			var r = routes[i];
			var match = info.path.match(r.route);
			if((info.method === r.method || '' == r.method) && match) {
				info.match = match;
				if(info.method == 'POST' || info.method == 'PUT') {
					processRequest(req, function(body) {
						info.post = body;
						r.handler(req, res, info);
					});
				} else {
					r.handler(req, res, info);
				}
				return;
			}
		}
		res.end('');
	}
}