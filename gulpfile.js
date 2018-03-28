const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                //不让外部的.babelrc影响内部
                babelrc: false,
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('build'))
    })
});
gulp.task('buildprod', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(babel({
            //不让外部的.babelrc影响内部
            babelrc: false,
            // ignore: ["./src/nodeuii/config/index.js"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest('build'))
});
gulp.task('buildconfig', () => {
    gulp.src('./src/nodeuii/config/*.js')
        //用 rollup对 node中配置信息config下的index.js进行tree shaking （rollup可以编译es6 所以这里不需要babel）
        .pipe(rollup({
            format: "cjs",
            input: "./src/nodeuii/config/index.js",
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./build/config'))
});

let _task = ["builddev"];

//上线
if (process.env.NODE_ENV == "production") {
    _task = ["buildprod"];
}
//上线代码优化
if (process.env.NODE_ENV == "config") {
    _task = ["buildconfig"];
}
gulp.task("default", _task);