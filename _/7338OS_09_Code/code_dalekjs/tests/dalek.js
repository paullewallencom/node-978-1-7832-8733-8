var url = 'http://127.0.0.1:3000';
var title = 'DalekJS test';
module.exports = {
	'should interact with the application': function (test) {
	  	test
		.open(url)
		.assert.text('h1', 'First page', 'The title is "First page"')
		.type('input[type="text"]', title)
		.submit('form')
		.assert.text('h1', title, 'The title is "' + title + '"')
		.screenshot('./screen.jpg')
		.click('a')
		.assert.text('h1', 'First page', 'We are again on the home page')
		.done()
	}
};