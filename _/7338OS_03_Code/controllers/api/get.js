module.exports = function(req, res, next) {
	req.articles.get(function(rows) {
		res.send(rows);
	});
}