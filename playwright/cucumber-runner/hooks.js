const {
    Before,
    After,
    BeforeAll,
    AfterAll,
    Status,
    setDefaultTimeout,
} = require('@cucumber/cucumber');
setDefaultTimeout(180 * 1000);
const {chromium, webkit, firefox, request} = require('playwright');
const config = require('../config');
const clc = require('cli-color');
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
const customWorld = require('../step-definitions/world');


/** Create a global browser for the test session.*/
BeforeAll(async () => {
    const browserName = process.env.BROWSER ? process.env.BROWSER : 'chromium';
    global.pw_config = config.projects.find((project) => project.name === browserName).use;
    console.log(clc.blue('******* par-automation-tests ***************'));
    console.log(clc.blue('******* launch ' + global.pw_config.browser + ' browser **************'));
    console.log(clc.blue('****   running tests on ' + process.env.NODE_ENV + ' environment   ****'));
    switch (global.pw_config.browser) {
    case 'firefox':
        global.browser = await firefox.launch(global.pw_config.launchOptions);
        break;
    case 'webkit':
        global.browser = await webkit.launch(global.pw_config.launchOptions);
        break;
    default:
        global.browser = await chromium.launch(global.pw_config.launchOptions);
    }
});

AfterAll(async () => {
    await global.browser.close();
});

/** Create a fresh browser context for each test. */
Before(async (scenario) => {
    console.log('=====> ' + clc.magenta(`Create new context and page for ${scenario.pickle.name} scenario`));
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: 'playwright/report/video/' + scenario.pickle.name,
        }
    });
    global.page = await global.context.newPage();
    global.request = await request.newContext();
});

After(async () => {
    console.log('=====> ' + clc.blue('Close new context and page'));
    await global.context.close();
    await global.page.close();
});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        let buffer = await global.page.screenshot({
            path: `playwright/report/screenshots/${scenario.pickle.name}.png`,
            fullPage: true
        });
        this.attachScreenshot(buffer, 'image/png');
    }
});

After(async function () {
    /** Clear all dataStores after each scenario */
    customWorld.clearAllDataStores();
});

