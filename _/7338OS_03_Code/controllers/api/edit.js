module.exports = function(req, res, next) {
	req.articles.update(req.body, function() {
		res.send({success: true});
	});
}