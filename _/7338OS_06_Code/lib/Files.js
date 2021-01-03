var fs = require('fs');
var argv = require('optimist').argv;
var readline = require('readline');
var glob = require('glob');
var currentDirectory = process.cwd() + '/';
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var getPath = function(callback) {
	rl.question('Please type a path to directory: ', function(answer) {
		callback(currentDirectory + answer);
	});
}

var readDirectory = function(path, callback) {
	if(fs.existsSync(path)) {
		glob(path + "/**/*.+(jpg|jpeg|gif|png)", function(err, files) {
			if(err) {
				throw new Error('Can\'t read the directory.');
			}
			console.log("Found images:");
			files.forEach(function(file) {
				console.log(file.replace(/\//g, '\\').replace(process.cwd(), ''));
			});
			rl.question('Are you sure (y/n)? ', function(answer) {
				if(answer == 'y') {
					callback(files);
				}
				rl.close();
			});
		});		
	} else {
		getPath(function(path) {
			readDirectory(path, callback);
		});
	}
}

module.exports = function(callback) {
	if(argv.s) {
		readDirectory(currentDirectory + argv.s, callback);
	} else {
		getPath(function(path) {
			readDirectory(path, callback);
		});
	}
};