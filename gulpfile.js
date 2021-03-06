var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var pkg = require('./package.json');

var banner = ['/**',
  ' * Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author %>',
  ' * ',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// Concatenate and minify JavaScript files in the project.
gulp.task('build-js', function() {
  return gulp.src(pkg.files)
    .pipe(concat(pkg.name + '.js'))
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/'));
});

// Auto-build when .js files are modified.
gulp.task('watch', function() {
  gulp.src(pkg.files)
    .pipe(watch(pkg.files, function () {
      gulp.start('build-js');
    }));
});

gulp.task('default', function() {
  gulp.start('build-js');
});
