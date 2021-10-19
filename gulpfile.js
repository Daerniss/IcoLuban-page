const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del');

gulp.task('scss', function () {
	return gulp
		.src('./src/static/scss/main.scss')
		.pipe(
			plumber({
				errorHandler : notify.onError(function (err) {
					return {
						title   : 'Styles',
						sound   : false,
						message : err.message
					};
				})
			})
		)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(
			autoprefixer({
				overrideBrowserslist : [
					'last 2 versions'
				]
			})
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/static/css/'))
		.pipe(browserSync.stream());
});

gulp.task('html', function () {
	return gulp.src('./src/index.html').pipe(gulp.dest('./build/')).pipe(browserSync.stream());
});

gulp.task('copy:img', function (callback) {
	return gulp.src('./src/static/img/**/*.*').pipe(gulp.dest('./build/static/img/'));
});

gulp.task('copy:js', function () {
	return gulp.src('./src/static/js/**/*.js').pipe(gulp.dest('./build/static/js/'));
});
gulp.task('copy:favico', function () {
	return gulp.src('./src/static/favico/**/*.*').pipe(gulp.dest('./build/static/favico/'));
});

gulp.task('copy:html', function () {
	return gulp.src('./src/*.html').pipe(gulp.dest('./build/'));
});

gulp.task('copy:fonts', function (callback) {
	return gulp.src('./src/static/fonts/**/*.*').pipe(gulp.dest('./build/static/fonts/'));
});

gulp.task('watch', function () {
	watch(
		[
			'./build/static/js/**/*.*',
			'./build/static/img/**/*.*'
		],
		gulp.parallel(browserSync.reload)
	);
	watch('./build/*.html', gulp.parallel(browserSync.reload));

	watch('./src/static/scss/**/*.scss', gulp.parallel('scss'));

	watch('./src/static/img/**/*.*', gulp.parallel('copy:img'));
	watch('./src/static/js/**/*.*', gulp.parallel('copy:js'));
	watch('./src/static/fonts/**/*.*', gulp.parallel('copy:fonts'));
	watch('./src/*.html', gulp.parallel('copy:html'));
});

gulp.task('server', function () {
	browserSync.init({
		server : {
			baseDir : './build/'
		}
	});
});

gulp.task('clean:build', function () {
	return del('./build');
});

gulp.task(
	'default',
	gulp.series(
		gulp.parallel('clean:build'),
		gulp.parallel('scss', 'copy:img', 'copy:js', 'copy:fonts', 'copy:favico', 'copy:html'),
		gulp.parallel('server', 'watch')
	)
);
