module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			javascript: {
				options: {
					process: function(src, filepath) {
						return '// Source: ' + filepath + '\n' + src;
		        	}
			    },
				src: ['src/**/*.js', '!src/lib/D.js'],
				dest: 'build/scripts.js'
			}
		},
		uglify: {
			javascript: {
				files: {
					'build/scripts.min.js': '<%= concat.javascript.dest %>'
				}
			}
		},
		jssize: {
			javascript: {
				check: 'build/scripts.js',
				dest: 'build/size.log'
			}
		},
		'generate-manifest': {
			manifest: {
				dest: 'cache.manifest',
				files: [
					'build/*.js',
					'css/styles.css',
					'img/*.*'
				]
			}
		},
		yuidoc: {
			compile: {
				name: 'Project',
				description: 'Description',
				options: {
					paths: 'src/',
					outdir: 'docs/'
				}
			}
		},
		watch: {
			javascript: {
				files: ['<%= concat.javascript.src %>'],
				tasks: ['concat:javascript', 'uglify', 'jssize']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadTasks('custom');
	grunt.registerTask('default', ['concat', 'uglify', 'jssize', 'generate-manifest', 'yuidoc', 'watch']);
}