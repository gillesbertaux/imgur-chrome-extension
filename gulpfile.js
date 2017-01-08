// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var stylus       = require('gulp-stylus');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src([
    'javascript/loop.js',
    'javascript/storage.js',
    'javascript/main.js'
    ])
    .pipe(concat('main.js'))
    .pipe(rename('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('chrome'));
});

// Stylus
gulp.task('stylus', function () {
  return gulp.src('stylus/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('chrome'));
});

// Autoprefixer
gulp.task('css', function () {
  var plugins = [autoprefixer({browsers: ['> 1%'], cascade: false})];
  return gulp.src('chrome/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('chrome'));
});

// HTML
gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe(rename('imgur.html'))
    .pipe(gulp.dest('chrome'))
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('javascript/*.js', ['scripts']);
  gulp.watch('stylus/*.styl', ['stylus', 'css']);
  gulp.watch('index.html', ['html']);
});

// Default Task
gulp.task('default', ['html', 'stylus', 'css', 'scripts']);