var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jssize = require('./custom/jssize');

gulp.task('js', function() {
	gulp.src('./src/**/*.js')
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('./build/'))
	.pipe(jssize())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('./build/'))
});

gulp.task('watchers', function() {
	gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['js', 'watchers']);