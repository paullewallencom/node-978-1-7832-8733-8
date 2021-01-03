var request = require('request');
var endpoint = 'http://127.0.0.1:9000/';
var bookID = '';
describe("Testing API", function() {
	it("should create a new book record", function(done) {
		request.post({ 
			url: endpoint + '/book', 
			form: {
				name: 'Test Book',
				author: 'Test Author'
			}
		}, function (e, r, body) {
			expect(body).toBeDefined();
			expect(JSON.parse(body).message).toBeDefined();
			expect(JSON.parse(body).message).toBe('Record created successfully.');
			done();
		});
	});
	it("should get all the books", function(done) {
		request.get({ 
			url: endpoint + '/books'
		}, function (e, r, body) {
			var books = JSON.parse(body);
			expect(body).toBeDefined();
			expect(books.length > 0).toBeDefined();
			bookID = books[0].ID;
			expect(bookID).toBeDefined();
			done();
		});
	});
	it("should edit", function(done) {
		request.put({ 
			url: endpoint + '/book/' + bookID, 
			form: {
				name: 'New name',
				author: 'New author'
			}
		}, function (e, r, body) {
			expect(body).toBeDefined();
			expect(JSON.parse(body).message).toBeDefined();
			expect(JSON.parse(body).message).toBe('Record updated successfully.');
			done();
		});
	});
	it("should delete a book", function(done) {
		request.del({ 
			url: endpoint + '/book/' + bookID
		}, function (e, r, body) {
			expect(body).toBeDefined();
			expect(JSON.parse(body).message).toBeDefined();
			expect(JSON.parse(body).message).toBe('Record removed successfully.');
			done();
		});
	});
});