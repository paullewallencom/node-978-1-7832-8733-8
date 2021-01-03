var assert = require("assert");
describe("Testing the reading of the file's content.", function() {
	it("should create an instance of app.js", function(done) {
		var app = require("../app.js");
		if(typeof app == "undefined") {
			assert.fail('undefined', 'object');
		}
		done();
	});
	it("should read the file", function(done) {
		var app = require("../app.js");
		var content = app.read("./file.txt");
		assert.equal(content, "The quick brown fox jumps over the lazy dog.");
		done();
	});
});

describe("Testing if the file contains certain words", function() {
	it("should contains 'brown'", function(done) {
		var app = require("../app.js");
		var found = app.check("brown", "The quick brown fox jumps over the lazy dog.");
		assert.equal(found, true);
		done();
	});
});
describe("Testing the whole module", function() {
	it("read the file and search for 'lazy'", function(done) {
		var app = require("../app.js");
		app.read("./file.txt")
		assert.equal(app.check("lazy"), true);
		done();
	});
});