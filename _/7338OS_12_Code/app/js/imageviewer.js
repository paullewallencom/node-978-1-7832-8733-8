var sizeOf = require('image-size'),
	fs = require('fs'),
	path = require('path');

var ImageViewer = function() {
	var api = {};

	var filePath = decodeURI(location.search.split('file=')[1]);
	if(fs.existsSync(path.normalize(filePath))) {
		var img = document.querySelector('.image-viewer img');
		img.setAttribute('src', 'file://' + filePath);
		var dimensions = sizeOf(filePath);
		document.querySelector('.dimension').innerHTML = 'Dimension: ' + dimensions.width + 'x' + dimensions.height;
	}

	return api;
}

var Viewer;
window.onload = function() {
	Viewer = ImageViewer();
}