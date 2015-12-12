var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');

gulp.task('templates', function() {
    return gulp.src('./src/templates/**/*')
      .pipe(templateCache({standalone: true}))
      .pipe(gulp.dest('www/js'))
});

