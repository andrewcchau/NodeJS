var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');


gulp.task('hello', () => {
    console.log("Hello World!");
});

/* Starts the UI server */
gulp.task('server', () => {
    connect.server( {
        root: ['src', 'js'],
        port: 9000
    })
});

/* Compiles the SCSS to CSS */
gulp.task('sass', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

/* GULP command that executes everything */
gulp.task('dev', ['js', 'sass', 'server']);

const bundle = (b) => {
    return b.bundle()
        .on('error', (err) => {
            gutil.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
}


gulp.task('js', () => {
    return browserify({
        debug: true,
        entries: ['./src/js/main.js'],
        paths: ['./src/js', './node_modules'],
        cache: {},
        packageCache: {}
    }).transform(babelify)
        .bundle()
        .on('error', (err) => {
            gutil.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});