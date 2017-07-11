const gulp = require('gulp');
const exec = require('child_process').exec;

const paths = {
  html: './testDir/**/*.html',
};

gulp.task('fm', function (cb) {
  exec('node arg.js index.html test.md', (err, stdout) => {
    console.log(stdout);
    cb(err);
  });
})

gulp.task('convert-fm', () => {
  var stream = gulp.src(paths.html)
    .pipe(exec('node arg.js index.html test.md'))
  return stream;
})