var fs = require('fs');
module.exports = function(grunt) {
    grunt.registerMultiTask('jssize', 'Checks the JavaScript file size', function() {
    	var fileToCheck = this.data.check;
    	var destination = this.data.dest;
    	var stat = fs.statSync(fileToCheck);
    	var result = 'Filesize of ' + fileToCheck + ': ';
    	result += stat.size + 'bytes';
    	grunt.file.write(destination, result);
    });
};