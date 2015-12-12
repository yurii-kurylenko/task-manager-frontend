var gulp = require('gulp');

gulp.task('default', function() {
  return gulp.start(['build', 'watch', 'server'], function() {
    return console.log('Run');
  });
});

gulp.task('watch', function() {
  gulp.watch("src/js/**/*",  ['javascript:application', 'layout']);
  gulp.watch("src/templates/**/*",  ['templates', 'layout']);
});