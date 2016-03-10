const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const webpackEnv = require('webpack-env');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');

const files = {
  all: [__dirname + '/app/**/*.html', __dirname + '/app/js/*.js'],
  sass: [__dirname + '/app/styles/sass/**/*.scss']
};

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!**/node_modules/*', '!**/build/*'])
    .pipe(eslint(__dirname + '/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('html:dev', () => {
  gulp.src([__dirname + '/app/*.html', __dirname + '/app/**/*.html'])
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('images:dev', () => {
  gulp.src(__dirname + '/app/images/*')
    .pipe(gulp.dest(__dirname + '/build/images/'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [webpackEnv]
    }))
    .pipe(gulp.dest(__dirname + '/build/'));
});

gulp.task('sass:dev', () => {
  gulp.src(__dirname + '/app/styles/sass/manifest.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(__dirname + '/build/css/'));
});

gulp.task('build:dev', ['html:dev', 'images:dev', 'webpack:dev', 'sass:dev']);


gulp.task('sass:watch', () => {
  gulp.watch(files.sass, ['sass:dev']);
});

gulp.task('dev:watch', () => {
  gulp.watch(files.all, ['webpack:dev', 'html:dev']);
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      },
      htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/]
      },
      output: {
        filename: 'test_bundle.js'
      },
      plugins: [webpackEnv]
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('default', ['dev:watch', 'sass:watch']);
