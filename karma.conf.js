module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'data/elementary-kanji-array.js',
            'data/elementary-kanji-json.js',
            '*.html',
            'scripts/findAndReplaceDOMText.js',
            'scripts/replacer.js',
            // 'background.js',   chrome object does not exist in text env. what should I do?
            'unittest/**/*.js'
        ],
        exclude: [
        ],
        preprocessors: {
            'scripts/*.js': [ 'coverage' ],
            '*.html': ['html2js']
        },
        reporters: [
            'progress',
            'coverage'
        ],
        // report as an html file, or console text (I could not find a way to put both.)
        //        coverageReporter: {
        //            type: 'html',
        //            dir : 'coverage/'
        //        },
        coverageReporter: {
            type: 'text'
        },
        port: 9876,  // karma web server port
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: true,
        // singleRun: false, // Karma captures browsers, runs the tests and exits
        singleRun: true, // stop karma after test
        concurrency: Infinity
    });
};
