describe("Testing the reading of the file's content.", function() {
	it("should create an instance of app.js", function(done) {
		var app = require("../app.js");
		expect(app).toBeDefined();
		done();
	});
	it("should read the file", function(done) {
		var app = require("../app.js");
		var content = app.read("./file.txt");
		expect(content).toBe("The quick brown fox jumps over the lazy dog.");
		done();
	});
});

describe("Testing if the file contains certain words", function() {
	it("should contains 'brown'", function(done) {
		var app = require("../app.js");
		var found = app.check("brown", "The quick brown fox jumps over the lazy dog.");
		expect(found).toBe(true);
		done();
	});
});

describe("Testing the whole module", function() {
	it("read the file and search for 'lazy'", function(done) {
		var app = require("../app.js");
		app.read("./file.txt")
		expect(app.check("lazy")).toBe(true);
		done();
	});
});