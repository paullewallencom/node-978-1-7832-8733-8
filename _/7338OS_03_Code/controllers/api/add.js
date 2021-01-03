module.exports = function(req, res, next) {
	req.articles.add(req.body, function() {
		res.send({success: true});
	});
}