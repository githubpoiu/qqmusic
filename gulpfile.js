const gulp = require('gulp');
const htmlClean = require('gulp-htmlclean');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');

gulp.task('html', function () {
    gulp.src('src/html/*')
        .pipe(connect.reload())
        .pipe(htmlClean())
        .pipe(gulp.dest('dist/html/'))
})

gulp.task('css', function () {
    gulp.src('src/css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('js', function () {
    gulp.src('src/js/*')
        .pipe(connect.reload())
        // .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
})

gulp.task('image', function () {
    gulp.src('src/image/*')
        .pipe(connect.reload())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image/'))
})

gulp.task('server', function () {
    connect.server({
        port: '8081',
        livereload: true
    })
})

gulp.task('watch', function () {
    gulp.watch('src/html/*', ['html']);
    gulp.watch('src/css/*', ['css']);
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/image/*', ['image']);
})

gulp.task('default',['html','css','js', 'image','server','watch']);