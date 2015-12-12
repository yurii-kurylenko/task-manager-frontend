var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task('javascript', [
  'javascript:vendor',
  'javascript:application',
  'templates'
]);

gulp.task("javascript:application", function () {
  return gulp.src("./src/**/*.js")
    .pipe(babel({ presets: ['es2015']}))
    .pipe(concat("application.js"))
    .pipe(gulp.dest("www/js"));
});

var vendor_libs = [
  './bower_components/angular/angular.js',
  './bower_components/lodash/lodash.js',
  './bower_components/angular-ui-router/release/angular-ui-router.js',
  './bower_components/angularjs-rails-resource/angularjs-rails-resource.js',
  './bower_components/angular-cookie/angular-cookie.js',
  './bower_components/ng-token-auth/dist/ng-token-auth.js',
  './bower_components/angular-bootstrap/ui-bootstrap.js'
]

gulp.task("javascript:vendor", function () {
  return gulp.src(vendor_libs)
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("www/js"));
});