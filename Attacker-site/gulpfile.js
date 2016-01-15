var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');

gulp.task('js', function () {
    gulp.src(['ng/module.js', 'ng/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));

    gulp.src('exploits/**/*.js')
        .pipe(gulp.dest('assets/exploits/'));
});

gulp.task('css', function() {
    gulp.src('css/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:js', ['js'], function() {
    gulp.watch(['ng/**/*.js', 'exploits/**/*.js'], ['js']);
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('css/**/*.less', ['css']);
});

gulp.task('dev:server', function() {
    nodemon({
        verbose: true,
        script: 'server.js',
        watch: ['server.js', 'websocket.js', 'controllers/**/*.js', 'models/**/*.js']
    });
});

gulp.task('dev', ['watch:js', 'watch:css', 'dev:server']);
