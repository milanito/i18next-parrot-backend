import gulp from 'gulp';
import babel from 'gulp-babel';
import esdoc from 'gulp-esdoc';
import eslint from 'gulp-eslint';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import mocha from 'gulp-mocha';

gulp.task('doc', () => gulp.src('./src')
.pipe(esdoc({ destination: './docs'  })));

gulp.task('lint', () => gulp.src(['./src/**/*.js',
  '!dist/**', '!node_modules/**', '!coverage/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('build', () => gulp.src('src/**/*.js')
  .pipe(babel({
    presets: ['es2015', 'stage-2'],
    plugins: ['add-module-exports']
  }))
  .pipe(gulp.dest('dist')));


gulp.task('test', ['build'], (cb) => {
  gulp.src('./src/**/*.js')
  .pipe(istanbul())
  .pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
  .on('finish', () => {
    gulp.src('./tests/*.js')
    .pipe(babel())
    .pipe(injectModules())
      .pipe(mocha({
        timeout: 5000
      }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }))
    .on('end', cb);
  });
});
