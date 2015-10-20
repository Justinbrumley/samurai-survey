var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var minifyCss = require('gulp-minify-css');

gulp.task("browserify", function() {
  return browserify("./dev/app.js")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public"));
});

gulp.task("minifyCss", function() {
  return gulp.src('./dev/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task("watch", function() {
  gulp.watch([ "./dev/app.js", "./dev/js/**/*.js" ], [ "browserify" ]);
  gulp.watch([ "./dev/css/*.css" ], [ "minifyCss" ]);
});

gulp.task("default", ["browserify", "minifyCss", "watch"]);
