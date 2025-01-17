const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(180 * 1000);
const { chromium, webkit, firefox, request, devices } = require('playwright');
const config = require('../config');
const clc = require('cli-color');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const customWorld = require('../step-definitions/world');

BeforeAll(async () => {
    const browserName = process.env.BROWSER || 'chromium';
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
    case 'chromium':
        global.browser = await chromium.launch(global.pw_config.launchOptions);
        break;
    case 'msedge':
        global.browser = await chromium.launch({
            ...global.pw_config.launchOptions,
            channel: 'msedge',
        });
        break;
    default:
        throw new Error(`Unsupported browser: ${global.pw_config.browser}`);
    }
});


Before(async (scenario) => {
    console.log('=====> ' + clc.magenta(`Create new context and page for ${scenario.pickle.name} scenario`));
    const deviceConfig = global.pw_config.device ? devices[global.pw_config.device] : {};
    const browserName = global.pw_config.browser;
    console.log(clc.blue(`Using browser: ${browserName}`));
    if (global.pw_config.device) {
        console.log(clc.blue(`Emulating device: ${global.pw_config.device}`));
    } else {
        console.log(clc.blue('Using default desktop settings.'));
    }

    const isMobile = browserName === 'chromium' || browserName === 'webkit';

    global.context = await global.browser.newContext({
        ...deviceConfig,
        recordVideo: {
            dir: `playwright/report/video/${scenario.pickle.name}`,
        },
        geolocation: { latitude: 37.7749, longitude: -122.4194 },
        permissions: ['geolocation'],
        deviceScaleFactor: 2,
        isMobile,
        hasTouch: isMobile,
    });

    global.page = await global.context.newPage();
    global.request = await request.newContext();
});

AfterAll(async () => {
    await global.browser.close();
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
            fullPage: true,
        });
        this.attachScreenshot(buffer, 'image/png');
    }
});

After(async function () {
    customWorld.clearAllDataStores();
});
