var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');

gulp.task('css', function () {
    gulp.src('css/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('css/**/*.less', ['css']);
});

gulp.task('dev:server', function () {
    nodemon({
        verbose: true,
        script: 'server.js',
        watch: ['server.js', 'controllers/**/*.js', 'views/**/*.jade']
    });
});

gulp.task('dev', ['watch:css', 'dev:server']);
