/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library.
 ******************************************************/

const gulp         = require('gulp');
const argv         = require('minimist')(process.argv.slice(2));
const pkg          = require('./package.json');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
 ******************************************************/
const config     = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

function build() {
  return patternlab
    .build({
      watch: argv.watch,
      cleanPublic: config.cleanPublic,
    })
    .then(() => {
      style();
    });
}

function serve() {
  return patternlab.server
    .serve({
      cleanPublic: config.cleanPublic,
    })
    .then(() => {
      // do something else when this promise resolves
    });
}

function style() {
  const browserlist = pkg.browserlist;
  const plugins = [ autoprefixer({ browsers: browserlist }) ];
  return gulp.src('source/scss/custom/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write(paths().source.css))
    .pipe(gulp.dest(paths().public.css));
}


function paths() {
  return config.paths;
}

gulp.task('patternlab:version', function() {
  console.log(patternlab.version());
});

gulp.task('patternlab:patternsonly', function() {
  patternlab.patternsonly(config.cleanPublic);
});

gulp.task('patternlab:liststarterkits', function() {
  patternlab.liststarterkits();
});

gulp.task('patternlab:loadstarterkit', function() {
  patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task('patternlab:build', function() {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', function() {
  serve().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:installplugin', function() {
  patternlab.installplugin(argv.plugin);
});

gulp.task('default', ['patternlab:help']);
