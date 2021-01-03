module.exports = function(req, res, next) {
	if(req.logged) {
		res.render("admin", { app: "admin" });
	} else {
		res.render("login", { app: "" });
	}
}