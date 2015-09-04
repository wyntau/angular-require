var pkg = require('./package.json')

  , gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , header = require('gulp-header')
  , rename = require('gulp-rename')

  , bannerTemplate = [
    '/*!',
    ' * <%= pkg.name %> <%= pkg.version %>',
    ' * <%= pkg.description %>',
    ' * License: <%= pkg.license %>',
    ' * Author: <%= pkg.author %>',
    ' * Build: <%= date %>',
    ' **/\n'
  ].join('\n')
  , bannerData = {
    pkg: pkg,
    date: new Date()
  }

gulp.task('default', function(){
  return gulp.src('src/angular-require.js')
    .pipe(header(bannerTemplate, bannerData))
    .pipe(gulp.dest('.'))
    .pipe(uglify({
      mangle: {
        except: ['angular']
      },
      preserveComments: 'license'
    }))
    .pipe(rename('angular-require.min.js'))
    .pipe(gulp.dest('.'));
});
