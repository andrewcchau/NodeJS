const gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    log = require('fancy-log'),
    jest = require('gulp-jest').default;

/* Standard Hello World */
gulp.task('hello', () => {
    console.log("Hello World!");
});

/* Starts the UI server */
gulp.task('server', () => {
    connect.server( {
        root: 'dist',
        port: 9000
    })
});

/* Compiles the SCSS to CSS */
gulp.task('sass', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});

const bundle = (b) => {
    return b.bundle()
        .on('error', (err) => {
            log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
}

/* Created bundle.js from .js files */
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
            log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});

/* GULP command that executes everything */
gulp.task('dev', ['sass', 'js', 'html', 'server']);