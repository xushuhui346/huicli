const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('builddev', () => {
            return watch('./src/nodeuii/**/*.js', {
                ignoreInitial: false
            }, () => {
                gulp.src('./src/nodeuii/**/*.js')
                    .pipe(babel({
                    	//不让外部的.babelrc影响内部
                    	babelrc:false,
                    	"plugins":["transform-es2015-modules-commonjs"]
                    }))
                    .pipe(gulp.dest('build'))
            })
        });


gulp.task("default", ['builddev']);