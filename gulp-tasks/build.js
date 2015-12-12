var gulp = require('gulp');

gulp.task('build', ['clean'], function() {
  return gulp.start(['javascript'], function() {
    return gulp.start(['stylesheets'], function() {
      return gulp.start(['layout'], function() {
        console.log('Build finished');
      });
    });
  });
});


