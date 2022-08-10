const { watch, series, task } = require('gulp'),
  del = require('del'),
  cwebp = require('gulp-cwebp'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  newer = require('gulp-newer'),
  imageResize = require('gulp-image-resize');

'use strict';
var gulp = require('gulp');

// Convertir en webp
function webp(cb) {
  gulp.src('./minified/*.{jpeg,JPEG,jpg,JPG,png,PNG}')
    .pipe(cwebp())
    .pipe(gulp.dest('./minified'));
  cb();
}

// Optimize SVG images
function optimizeSVG(cb) {
  gulp.src('./src/*.{svg,SVG}')
    .pipe(newer('./minified'))
    .pipe(imagemin({
      svgoPlugins: [{removeViewBox: false}],
    }))
    .pipe(gulp.dest('./minified'));
  cb();
}

// Optimize images
function optimize(cb) {
  gulp.src('./resized/*.{jpeg,JPEG,jpg,JPG,png,PNG}')
    .pipe(newer('./minified'))
    .pipe(imagemin())
    .pipe(gulp.dest('./minified'))
  cb();
}

// Optimize images
function onlyOptimize(cb) {
  gulp.src('./src/*.{jpeg,JPEG,jpg,JPG,png,PNG}')
    .pipe(newer('./minified'))
    .pipe(imagemin())
    .pipe(gulp.dest('./minified'))
  cb();
}

// Redimensionne les images MAX 1920px de large 
function resize1920(cb) {
  gulp.src('./src/*.{jpeg,JPEG,jpg,JPG,png,PNG}')
  .pipe(newer('./resized'))
  .pipe(imageResize({
      imageMagick: true,
      width : 1920, // <==== CHANGER LA LARGEUR MAX ICI
      crop : false,
      upscale: false
    }))
    .pipe(rename({
      suffix: '-fullwidth' // <==== Changer le suffixe des images ICI
    }))
    .pipe(gulp.dest('./resized'));
  cb();
}

// Redimensionne les images MAX 1100px de large 
function resize1100(cb) {
  gulp.src('./src/*.{jpeg,JPEG,jpg,JPG,png,PNG}')
  .pipe(newer('./resized'))
  .pipe(imageResize({
      imageMagick: true,
      width : 1920, // <==== CHANGER LA LARGEUR MAX ICI
      crop : false,
      upscale: false
    }))
    .pipe(rename({
      suffix: '-1100' // <==== Changer le suffixe des images ICI
    }))
    .pipe(gulp.dest('./resized'));
  cb();
}

//  Redimensionne les images MAX 600px de large 
function resize600(cb) {
  gulp.src('./src/*.{jpeg,JPEG,jpg,JPG,png,PNG}')
  .pipe(newer('./resized'))
  .pipe(imageResize({
      imageMagick: true,
      width : 600, // <==== CHANGER LA LARGEUR MAX ICI
      crop : false,
      upscale: false
    }))
    .pipe(rename({
      suffix: '-600' // <==== Changer le suffixe des images ICI
    }))
    .pipe(gulp.dest('./resized'));
  cb();
}

// Créer des miniatures de 100 x 100px => l'image est recadrée
function thumb(cb) {
  gulp.src('./src/*.{jpeg,JPEG,jpg,JPG,png,PNG}')
  .pipe(newer('./resized'))
  .pipe(imageResize({
      imageMagick: true,
      width : 100, // <==== CHANGER LA LARGEUR ICI
      height : 100, // <==== CHANGER LA HAUTEUR ICI
      crop : true,
      upscale: false
    }))
    .pipe(rename({
      suffix: '-thumb' // <==== Changer le suffixe des images ICI
    }))
    .pipe(gulp.dest('./resized'));
  cb();
}

// Supprimer le contenu d'un dossier
function clean(cb) {
  return del(['resized/*', 'src/*']);
}

// Surveille le dossier SRC et execute toutes les tâches
exports.default = function() {
  // La tâche par défaut surveille les différents dossiers
  watch('src/*.{jpeg,JPEG,jpg,JPG,png,PNG}', gulp.series(resize1920, resize600, thumb)); // Ici on change les tâches de redimensionnement
  watch('src/*.svg', optimizeSVG); // Optimisation des SVG
  watch('resized/*.{jpeg,JPEG,jpg,JPG,png,PNG}', optimize); // Opitmisation des autres images
  watch('minified/*.{jpeg,JPEG,jpg,JPG,png,PNG}', gulp.series(webp, clean)); // Version Wepb + vider le dossier
};

exports.simple = function() {
  // La tâche par défaut surveille les différents dossiers
  watch('src/*.svg', optimizeSVG); // Optimisation des SVG
  watch('src/*.{jpeg,JPEG,jpg,JPG,png,PNG,gif,GIF,svg,SVG}', onlyOptimize); // Opitmisation des autres images
};

// Créer les tâches
task(resize1920);
task(resize600);
task(thumb);
// Ajouter des tâches de redimensionnement ICI ==>

// <== Fin des tâches de redimensionnement 
task(onlyOptimize);
task(optimize);
task(optimizeSVG);
task(webp);
task(clean);