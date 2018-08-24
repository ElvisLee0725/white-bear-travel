var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); 
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// Use Gulp to open browser for the dist folder (This is the folder that will go live!)
gulp.task('previewDist', function(){

	browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"
		}
	});
});	

gulp.task('deleteDistFolder', ['icons'], function() {
	return del("./docs");
});

// Also added other necessary folders and files (such as in WordPress) if necessary. Need to exclude those compressed files.
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/scripts/**',
		'!./app/assets/styles/**',
		'!./app/temp',
		'!./app/temp/**'
	];
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./docs"));
});

// Only optimize images that we need for website
gulp.task('optimizeImages', ['deleteDistFolder'], function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

// Create a new task to trigger usemin task
gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start("usemin");
});

// usemin will go to the index.html to find the comment build:css or build:js inside index.html and bundle them to the correct destination
gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest("./docs"));
})

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);