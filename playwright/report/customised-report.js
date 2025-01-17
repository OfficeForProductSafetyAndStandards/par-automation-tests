let reporter = require('cucumber-html-reporter');
const envPlatform = process.platform;

let options = {
    theme: 'hierarchy',
    jsonFile: 'playwright/report/report.json',
    output: 'playwright/report/customised_cucumber_report.html',
    screenshotsDirectory: 'playwright/report/screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    brandTitle: 'par-automation-tests',
    metadata: {
        'Platform': envPlatform,
        'Parallel': 'Scenarios',
        'Executed': 'Remote'
    }
};

reporter.generate(options);
