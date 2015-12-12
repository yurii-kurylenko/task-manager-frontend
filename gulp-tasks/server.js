gulp = require('gulp');
nodemon = require('gulp-nodemon');

gulp.task('server', function() {
  return nodemon({
    script: 'server.js',
    ext: 'js html',
    ignore: ["./www/**/*", "./bower_components/**/*", "./node_modules/**/*", 'gulpfile.js']
  }).on('restart', function() {
    return console.log('Express server restarted');
  });
});
