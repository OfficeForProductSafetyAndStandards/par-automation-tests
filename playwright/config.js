require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
const path = require('path');
let headlessValue;
let envHeadlessValue = process.env.HEADLESS;
if (envHeadlessValue === null || envHeadlessValue === undefined) {
    headlessValue = true;
} else {
    headlessValue = JSON.parse(process.env.HEADLESS);
}
const browserOptions = {
    slowMo: 0,
    headless: headlessValue,
    downloadsPath: path.resolve(__dirname, './downloads'),
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
    firefoxUserPrefs: {
        'media.navigator.streams.fake': true,
        'media.navigator.permission.disabled': true,
    },
};

const config = {
    projects: [
        {
            name: 'chromium',
            use: {
                browser: 'chromium',
                launchOptions: browserOptions,
            }
        },
        {
            name: 'firefox',
            use: {
                browser: 'firefox',
                launchOptions: browserOptions,
            }
        },
        {
            name: 'safari',
            use: {
                browser: 'webkit',
                launchOptions: browserOptions,
            }
        },
    ]
};

module.exports = config;
