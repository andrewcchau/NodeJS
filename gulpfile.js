var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');


gulp.task('hello', function() {
    console.log("Hello World!");
});

/* Starts the UI server */
gulp.task('server', function() {
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

/* GULP command that executes everything */
gulp.task('dev', ['sass', 'server']);

function bundle(b) {
    return b.bundle()
        .on('error', function (err) {
            gutil.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
// Add transformation tasks to the pipeline here.
//        .pipe(config.production ? uglify() : gulpUtil.noop())
        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('./build' + config.versionPath + '/js/'));
        .pipe(gulp.dest('./dist/js/'));
}


gulp.task('js', function() {
    return browserify({
        debug: true,
        entries: ['./src/js/main.js'],
        paths: ['./src/js', './node_modules'],
        cache: {},
        packageCache: {}
    }).transform(babelify)
        .bundle()
        .on('error', function (err) {
            gutil.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});