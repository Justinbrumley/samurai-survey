var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("browserify", function() {
  return browserify("./dev/app.js")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public"));
});

gulp.task("watch", function() {
  gulp.watch([ "./dev/app.js", "./dev/js/*.js" ], [ "browserify" ]);
});

gulp.task("default", ["browserify", "watch"]);
