const gulp = require('gulp');
var sassCompiler = require('sass');
var gulpsass = require('gulp-sass')(sassCompiler);
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var cp = require('child_process');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/*
 * Build the Jekyll Site
 * runs a child process in node that runs the jekyll commands
 */

/*
 * Rebuild Jekyll & reload browserSync
 */


/*
* Compile and minify sass
*/
gulp.task('sass', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(plumber())
    .pipe(gulpsass())
    .pipe(csso())
		.pipe(gulp.dest('assets/css/'))
});

/*
* Compile fonts
*/
gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
		.pipe(plumber())
		.pipe(gulp.dest('assets/fonts/'))
});

/*
 * Minify images
 */
gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*.{jpg,png,gif}')
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/img/'))
});

/**
 * Compile and minify js
 */
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', gulp.series(['sass']));
  gulp.watch('src/js/**/*.js', gulp.series(['js']));
  gulp.watch('src/fonts/**/*.{tff,woff,woff2}', gulp.series(['fonts']));
  gulp.watch('src/img/**/*.{jpg,png,gif}', gulp.series(['imagemin']));
});

gulp.task('default', gulp.series(['js', 'sass', 'fonts', 'watch']));
