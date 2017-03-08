exports.config = {
    framework: "jasmine2",
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 100000,
        realtimeFailure: true,
        showTiming: true,
        includeStackTrace: true,
        isVerbose: true,
        onComplete: null
    },
    specs: [
        "../../e2e/*.js",
        "../../www/**/e2e/mod_assign.spec.js"
    ],
    baseUrl: 'http://moodle-mobile-e2e-magician03.c9users.io/',
    seleniumAddress: "http://diwakar03:7b030e87-542e-4a00-a40e-06a0a48dad1c@ondemand.saucelabs.com:80/wd/hub",
    multiCapabilities: [{
        name: 'chrome',
        browserName: "chrome",
        chromeOptions: {
            args: [
                "--allow-file-access",
                "--allow-file-access-from-files",
                "--enable-local-file-accesses",
                "--unlimited-storage"
            ]
        },
        platform: "Windows 10",
        version: "latest",
        username: "diwakar03",
        accessKey: "7b030e87-542e-4a00-a40e-06a0a48dad1c",
    },
    {
        "deviceName": "Samsung Galaxy S4 Emulator",
        "name": "android",
        "appium-version": "1.5.3",
        "app": "sauce-storage:moodlemobile.apk",
        "autoWebview":true,
        "platform": "Android",
        "browserName": "Android",
        "version": "4.4",
        "deviceOrientation": "portrait",
        "autoWebviewTimeout":10000,
        username: 'diwakar03',
        accessKey: '7b030e87-542e-4a00-a40e-06a0a48dad1c'
    }],
    restartBrowserBetweenTests: true,
    onPrepare: function(){
        var wd = require('wd'),
        protractor = require('protractor'),
        wdBridge = require('wd-bridge')(protractor, wd);
        wdBridge.initFromProtractor(exports.config);
        
        

        // Define global variables for our tests.
        global.ISANDROID      = false;
        global.ISBROWSER      = true;
        global.ISIOS          = false;
        global.ISTABLET       = false;
        global.DEVICEURL      = 'https://moodle-mobile-e2e-magician03.c9users.io/';
        global.DEVICEVERSION  = undefined;
        global.SITEURL        = 'http://qa.moodle.net';
        global.SITEVERSION    = 2.9;
        global.SITEHASLM      = false;
        global.USERS          = 
{
    "STUDENT": {
        "LOGIN": "student",
        "PASSWORD": "test"
    },
    "TEACHER": {
        "LOGIN": "teacher",
        "PASSWORD": "moodle"
    },
    "ADMIN": {
        "LOGIN": "admin",
        "PASSWORD": "test"
    }
};    
    },
    getPageTimeout: 15000,
    plugins: [
        {
            "path": "../../e2e/plugins/wait_for_transitions.js"
        }
    ]
};