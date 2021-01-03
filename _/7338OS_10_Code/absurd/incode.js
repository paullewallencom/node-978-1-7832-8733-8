var absurd = require('absurd')();
absurd.add({
	body: {
		fontSize: '20px',
		marginTop: '10px'
	}
}).compile(function(err, css) {
	console.log(css);
});