'use strict';

const gulp = require('gulp'),
      autoprefixer = require('autoprefixer'),
      babel = require('gulp-babel'),
      cssnano = require('gulp-cssnano'),
      postcss = require('gulp-postcss'),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      browserSync = require('browser-sync').create();

let sassOptions = {
  outputStyle: 'compressed'
};

let postcssPlugins = [
  autoprefixer({browsers: 'last 2 versions'})
];

// Compila scss a css
gulp.task('sass', ()=>
  gulp.src('./dev/sass/styles.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(cssnano())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream())
);

//Compila pug a html. Para compilar html en una sola linia poner {pretty:false}
gulp.task('pug', function(){
  return gulp.src('./dev/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./views/'))
});

gulp.task('js', ()=>
  gulp.src('./dev/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
);

//Tarea para vigilar los cambios
gulp.task('watch', function(){
  gulp.watch('./dev/sass/**/*.scss', ['sass']);
  gulp.watch('./dev/pug/**/*.pug', ['pug']);
  gulp.watch('./dev/js/**/*.js', ['js']);
  gulp.watch("./views/*.html").on('change', browserSync.reload);
});

//Servidor de desarrollo
gulp.task('server', function(){
  browserSync.init({
    server:{
      baseDir: "./views"
    }
  });
});

gulp.task('default', ['watch','server']);
