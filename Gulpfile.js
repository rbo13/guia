var gulp = require('gulp'),
    gulpMocha = require('gulp-mocha');


gulp.task('test', function(){
  gulp.src('tests/*.js', { isPremium: false })
      .pipe(gulpMocha({reporter: 'nyan'}))
});
