var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');


gulp.task('hello', function() {
    console.log("Hello World!");
});

/* Starts the UI server */
gulp.task('dev', function() {
    connect.server( {
        root: ['src', 'js'],
        port: 9000
    })
});

/* Compiles the SCSS to CSS */
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

/* Default GULP command that executes everything */
gulp.task('default', ['sass', 'dev']);