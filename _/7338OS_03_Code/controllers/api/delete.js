module.exports = function(req, res, next) {
	req.articles.remove(req.body.id, function() {
		res.send({success: true});
	});
}