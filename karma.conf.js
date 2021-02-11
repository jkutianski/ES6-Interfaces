/* jshint node: true */

module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai"],

    client: {
      mocha: {
        expose: ['body']
      }
    },

    basePath: process.cwd(),
    files: [
      { pattern: './build/browser/*.js', type: 'module' },
      { pattern: './tests/src/browser/*.js', type: 'module' },
      { pattern: './tests/src/common/*.mjs', type: 'module' }
    ],

    preprocessors: {
      './build/browser/*.js': ['coverage']
    },

    reporters: ['summary', 'coverage', 'karma-remap-istanbul'],
    summaryReporter: {
      show: 'all',
      specLength: 50,
      overviewColumn: true,
      browserList: 'always'
    },
    coverageReporter: {
        type : 'json',
        subdir : '.',
        dir : 'tests/coverage/browser/',
        file : 'coverage.json'
    },
    remapIstanbulReporter: {
          remapOptions: {
            exclude: 'utils.mjs'
          },
          src: 'tests/coverage/browser/coverage.json',
          reports: {
              html: 'tests/coverage/browser'
          },
          timeoutNotCreated: 5000, // default value
          timeoutNoMoreFiles: 1000 // default value
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['ChromeHeadless', 'FirefoxHeadless'],

    singleRun: true,
    autoWatch: false,
    concurrency: Infinity
  });
};
