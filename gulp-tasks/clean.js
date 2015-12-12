gulp = require('gulp');
del = require('del');

/*
  Clean task
 */

gulp.task('clean', [], function() {
  return del.sync('www');
});
