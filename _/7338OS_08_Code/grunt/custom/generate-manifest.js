module.exports = function(grunt) {
    grunt.registerMultiTask('generate-manifest', 'Generate manifest file', function() {

        var content = '',
        	self = this,
        	d = new Date();

        content += 'CACHE MANIFEST\n';
        content += '# created on: ' + d.toString() + '\n';
        content += '# id: ' + Math.floor((Math.random()*1000000000)+1) + '\n';

        var files = grunt.file.expand(this.data.files);
        for(var i=0; i<files.length; i++) {
            content += '/' + files[i] + '\n';
        }
        grunt.file.write(this.data.dest, content, {});		

    });
};