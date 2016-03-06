const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');

const files = {
  all: [__dirname + '/app/**/*.html',
    __dirname + '/app/*.html',
    __dirname + '/app/js/*.js'
  ],
  sass: [__dirname + '/app/styles/sass/**/*.scss']
};



gulp.task('html:dev', () => {
  gulp.src([__dirname + '/app/*.html', __dirname + '/app/**/*.html'])
    .pipe(gulp.dest(__dirname + '/build'))
})

// Webpack
gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build/'))
});

gulp.task('sass:all', function() {
  gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(__dirname + '/build/css/'));
});



gulp.task('sass:watch', function() {
  gulp.watch(files.sass, ['sass:all']);
});


gulp.task('dev:watch', () => {
  gulp.watch(files.all, ['webpack:dev', 'html:dev'])
});

gulp.task('default', ['dev:watch', 'sass:watch']);