/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

gulp.task("css", function (done) {
  console.log("minifying css...");
  // gulp.src('./assets/scss/**/*.scss')
  // .pipe(sass())
  // .pipe(cssnano())
  // .pipe(gulp.dest('./assets/css'))

  gulp
    .src("./assets/**/*.scss")
    .pipe(sass())
    .pipe(cssnano({ zindex: false }))
    .pipe(rev())
    .pipe(rename({ dirname: "css" }))
    .pipe(gulp.dest("./public/assets/"))
    .pipe(
      rev.manifest("public/assets/rev-manifest.json", {
        base: "./public/assets/",
        merge: true, // merge with the existing manifest (if one exists)
      })
    )
    .pipe(gulp.dest("./public/assets/"));
  done();
});

gulp.task("js", function (done) {
  // eslint-disable-next-line no-console
  console.log("minifying js...");
  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets/"))
    .pipe(
      rev.manifest("public/assets/rev-manifest.json", {
        base: "./public/assets",
        merge: true, // merge with the existing manifest (if one exists)
      })
    )
    .pipe(gulp.dest("./public/assets/"));
  done();
});

gulp.task("images", function (done) {
  console.log("compressing images...");
  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets/"))
    .pipe(
      rev.manifest("public/assets/rev-manifest.json", {
        base: "./public/assets/",
        merge: true, // merge with the existing manifest (if one exists)
      })
    )
    .pipe(gulp.dest("./public/assets/"));
  done();
});

// empty the public/assets directory
gulp.task("clean:assets", function (done) {
  del.sync("./public/assets");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  function (done) {
    console.log("Building assets");
    done();
  }
);
