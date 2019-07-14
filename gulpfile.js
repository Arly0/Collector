// start project if don`t have packaje.json
// * npm init
//
// * npm install --save-dev gulp node-sass gulp-sass gulp-rename gulp-csso gulp-sourcemaps gulp-autoprefixer @babel/core @babel/preset-env gulp-babel gulp-uglify gulp-concat gulp-imagemin browser-sync

const   gulp    = require('gulp'),
        sMaps   = require('gulp-sourcemaps'),
        rename  = require('gulp-rename'),
        concat  = require('gulp-concat'),
        imgmin  = require('gulp-imagemin'),
        browser = require('browser-sync').create(),
        // CSS
        sass    = require('gulp-sass'),
        csso    = require('gulp-csso'),
        aPrefix = require('gulp-autoprefixer'),
        // JS
        babel   = require('gulp-babel'),
        uglify  = require('gulp-uglify');


    sass.compiler = require('node-sass');

    // ! SASS
    gulp.task('sass', function(){
        return gulp.src('src/sass/main.sass')
            .pipe(sMaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(aPrefix({
                    browsers: ['last 15 versions'],
                    cascade: false
                }))
                .pipe(csso())
                .pipe(rename({
                    basename: 'style',
                    extname: '.css',
                }))
            .pipe(sMaps.write())
            .pipe(gulp.dest('build/css'))
    });

    // ! JS
    gulp.task('js', function(){
        return gulp.src('src/js/*.js')
            .pipe(sMaps.init())
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                .pipe(uglify())
                // TODO idk why rename now dont work HERE. Need to fix
                .pipe(rename({
                    sufix: '.min',
                    prefix: '',
                }))
            .pipe(sMaps.write())
            .pipe(gulp.dest('build/js'))
    });


    // ! LIBS JS
    gulp.task('libsJS', function(){
        return gulp.src('src/libs/**/*.js')
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('build/js'))
    });

    // ! LIBS CSS
    gulp.task('libsCSS', function(){
        return gulp.src('src/libs/**/*.css')
            .pipe(concat('libs.min.css'))
            .pipe(csso())
            .pipe(gulp.dest('build/css'))
    });

    // ! HTML / PHP -- TEMPLATE
    gulp.task('html_t', function(){
        return gulp.src('src/template/*.php')
            .pipe(gulp.dest('build/'))
    });

    // ! HTML / PHP -- STATIC
    gulp.task('html_st', function(){
        return gulp.src('src/static/*.php')
            .pipe(gulp.dest('build/static/'))
    });

    // ! IMAGES
    gulp.task('images', function(){
        return gulp.src('src/images/*')
            .pipe(imgmin())
            .pipe(gulp.dest('build/images'))
    });

    // ! FONTS
    gulp.task('fonts', function(){
        return gulp.src('src/fonts/*')
            .pipe(gulp.dest('build/fonts'))
    });

    // ! Browser Sync
    gulp.task('server', function(){
        browser.init({
            server: {
                baseDir: "dist"
            }
        })
    });

    // ! watch
    gulp.task('watch', function(){
        gulp.watch(['src/tamplate/*.php'], gulp.series('html_t'));
        gulp.watch(['src/static/*.php'], gulp.series('html_st'));
        gulp.watch(['src/sass/*.sass'], gulp.series('sass'));
        gulp.watch(['src/js/*.js'], gulp.series('js'));
        gulp.watch(['src/libs/**/*.js'], gulp.series('libsJS'));
        gulp.watch(['src/libs/**/*.css'], gulp.series('libsCSS'));
        gulp.watch(['src/images'], gulp.series('images'));
        gulp.watch(['src/fonts'], gulp.series('fonts'));
    });

    // ! default runing withOUT server
    gulp.task('default', gulp.series(
        gulp.parallel('html_st', 'html_t', 'sass','js', 'libsJS', 'libsCSS', 'images', 'fonts'),
        gulp.parallel('watch')
    ));

    // ! default runing with server
    gulp.task('server-defalut', gulp.series(
        gulp.parallel('html_st', 'html_t', 'sass','js', 'libsJS', 'libsCSS', 'images', 'fonts'),
        gulp.parallel('watch', 'server')
    ));