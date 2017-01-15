// Karma configuration
// Generated on Tue Mar 17 2015 15:45:59 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'jasmine', 'requirejs'],

    browserify: {
        watch: true,
        debug: true
    },

    // list of files / patterns to load in the browser
    files: [
      'www/lib/ionic/release/js/ionic.bundle.js',
      'www/lib/ionic/release/js/ionic-angular.js',
      //'node_modules/browserify/*.js',
      ///'node_modules/karma-browserify/*.js',
      //'node_modules/watchify/*.js',
      'www/lib/requirejs/*.js',
      'www/lib/moment/moment.js',
      'www/lib/an*/an*.js',
      'www/lib/angular-ui-router/release/an*.js',
      'www/lib/angular-chart.js/an*.js',
      'www/lib/ch*/src/chart.js',
      'www/lib/js*/dist/*.js',
      'www/lib/moment/moment.js',
      'www/lib/ng*/**/*.js',
      'www/lib/oc*/dist/*.js',
      'www/lib/**/browser*.*',
      'www/lib/ckeditor/ckeditor.js',
      'www/lib/ionic/release/js/ionic.js',
      'www/lib/ydn.db/jsc/ydn.db-dev.js',
      'www/build/*.js',
      'www/**/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //'www/core/tests/*.js': [ 'browserify' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
