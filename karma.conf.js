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
      { pattern: './src/browser/*.js', type: 'module' }
    ],

    reporters: ['summary'],
    summaryReporter: {
      show: 'all',
      specLength: 50,
      overviewColumn: true,
      browserList: 'always'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    browsers: ['ChromeHeadless', 'FirefoxHeadless'],

    singleRun: true,
    autoWatch: false,
    concurrency: Infinity
  });
}
