var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var rename = require('gulp-rename');
var del = require('del');

var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

// Start from deleting the previous sprite file so it won't keep creating new sprite files.
gulp.task('beginClean', function() {
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

// Create sprite and save in temp/sprite, use dependency to make sure it starts after cleaning
gulp.task('createSprite', ['beginClean'], function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
});

// Copy the created sprite into the assets/images/sprites folder, use dependency to make sure it starts after sprite created
gulp.task('copySpriteGraphic', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

// Copy the sprite css and change it's name to _sprite.css and save it at assets/styles/modules like other .css files, use dependency to make sure it starts after sprite created
gulp.task('copySpriteCSS', ['createSprite'], function (){
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});

// Delete the temp/sprite folder and all files created since they are all copied to their destinations, use dependency to make sure it starts after copied
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
	return del(['./app/temp/sprite']);
});

// Run gulp icons for those operations above
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);