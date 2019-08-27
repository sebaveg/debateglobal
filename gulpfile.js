'use strict';

const gulp = require('gulp'),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      webp = require('gulp-webp'),
      // useref = require('gulp-useref'),
      // concat = require('gulp-concat'),
      // uncss = require('gulp-uncss'),
      autoprefixer = require('autoprefixer'),
      // cleanCSS = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      // htmlmin = require('gulp-htmlmin')
      cssnano = require('gulp-cssnano'),
      postcss = require('gulp-postcss'),
      browserSync = require('browser-sync').create(),
      dir = {
          src : 'src',
          dist : 'dist',
          nm : 'node_modules'
      },
      files = {
          CSS : [
            `${dir.nm}/ed-grid/css/ed-grid.min.css`,
            `${dir.nm}/font-awesome/css/font-awesome.min.css`,
            `${dir.dist}/css/styles.css`
          ],
          mCSS : 'styles.min.css',
          JS : [
            `${dir.nm}/jquery/dist/jquery.min.js`,
            `${dir.dist}/js/scripts.js`
          ],
          mJS : 'scripts.min.js',
          fonts : [`${dir.nm}/font-awesome/fonts/*.*`],
          statics : [
            `${dir.src}/readme.md`,
            `${dir.src}/sitemap.xml`
          ]
      },
      opts = {
          pug: {
            pretty : true,
            locals : {
              title : 'Debate Global',
              files : files
            }
          },
          sass : {outputStyle: 'compressed'},
          es6 : {presets : ['env']},
          imagemin : {
            progressive : true,
            use : [ pngquant()]
          }
      };

let postcssPlugins = [
  autoprefixer({browsers: 'last 2 versions'})
];

//Compila pug a html. Para compilar html en una sola linia poner {pretty:false}
gulp.task('pug', () => {
  gulp
    .src(`${dir.src}/pug/*.pug`)
    .pipe( pug(opts.pug) )
    .pipe( gulp.dest(dir.dist) )
});

// Compila scss a css
gulp.task('sass', () => {
  gulp
    .src(`${dir.src}/scss/*.scss`)
    .pipe(sass(opts.sass).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(cssnano())
    .pipe( gulp.dest(`${dir.dist}/css`) )
    .pipe(browserSync.stream())
});

gulp.task('es6', () => {
  gulp
    .src(`${dir.src}/js/script.js`)
    .pipe(babel(opts.es6))
    .pipe(uglify())
    .pipe(gulp.dest(`${dir.dist}/js`))
});

gulp.task('img', () => {
  gulp
    .src(`${dir.src}/img/*.+(png|jpeg|jpg|gif)`)
    .pipe(imagemin(opts.imagemin))
    .pipe( gulp.dest(`${dir.dist}/img`) )
})

gulp.task('webp', () => {
  gulp
    .src(`${dir.src}/img/*.+(png|jpeg|jpg)`)
    .pipe(webp())
    .pipe(gulp.dest(`${dir.dest}/img/webp`))
})

//Tarea para vigilar los cambios
gulp.task('watch', function(){
  gulp.watch('./dev/sass/**/*.scss', ['sass']);
  gulp.watch('./dev/pug/**/*.pug', ['pug']);
  gulp.watch('./dev/js/**/*.js', ['js']);
  gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

//Servidor de desarrollo
gulp.task('server', function(){
  browserSync.init({
    server:{
      baseDir: "./dist"
    }
  });
});

gulp.task('default', ['watch','server']);
