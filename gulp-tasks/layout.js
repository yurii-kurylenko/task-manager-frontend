var gulp = require('gulp');
var inject = require('gulp-inject');
var series = require('stream-series');
var rename = require('gulp-rename');


gulp.task('layout', function() {
  var vendor_js = gulp.src(["www/js/vendor.js"])
  var application_js = gulp.src(["www/js/application.js"])
  var tempalates_js = gulp.src(["www/js/templates.js"])
  var css = gulp.src(["www/css/*.css"]);
  return build(series(css, vendor_js, application_js, tempalates_js), "www");
});


var build = function(sources, dir_path) {
  return gulp.src("./src/views/layout.html").
    pipe(inject(sources, {
      ignorePath: dir_path
  })).pipe(rename('index.html')).pipe(gulp.dest(dir_path));
};