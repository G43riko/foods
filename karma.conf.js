// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const pupeeteer = require("puppeteer");
process.env.CHROME_BIN = pupeeteer.executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        files: [
            "https://code.jquery.com/jquery-3.1.1.min.js",
            "https://rawgit.com/Semantic-Org/Semantic-UI/master/dist/semantic.min.js"
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        angularCli: {
            environment: 'dev'
        },
        customLaunchers: {
            ChromiumHeadless: {
                base: "ChromeHeadless",
                flags: [
                    "--headless",
                    "--disable-gpu",
                    "--no-sandbox",
                    "remote-debugging-port=9200"
                ]
            }
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromiumHeadless'],
        singleRun: true
    });
};
