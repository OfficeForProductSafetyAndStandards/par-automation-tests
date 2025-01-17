require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const path = require('path');

const envHeadlessValue = process.env.HEADLESS;
const headlessValue = envHeadlessValue === 'false' ? false : envHeadlessValue === 'true' ? true : true;

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
                device: null,
                launchOptions: browserOptions,
            },
        },
        {
            name: 'firefox',
            use: {
                browser: 'firefox',
                device: null,
                launchOptions: browserOptions,
            },
        },
        {
            name: 'edge',
            use: {
                browser: 'chromium',
                device: null,
                launchOptions: {
                    ...browserOptions,
                    channel: 'msedge',
                },
            },
        },
        {
            name: 'safari',
            use: {
                browser: 'webkit',
                device: null,
                launchOptions: browserOptions,
            },
        },
        {
            name: 'iPhone 12',
            use: {
                browser: 'webkit',
                device: 'iPhone 12',
                launchOptions: browserOptions,
            },
        },
        {
            name: 'Pixel 5',
            use: {
                browser: 'chromium',
                device: 'Pixel 5',
                launchOptions: browserOptions,
            },
        },
        {
            name: 'iPad Pro 11',
            use: {
                browser: 'chromium',
                device: 'iPad Pro 11',
                launchOptions: browserOptions,
            },
        },
    ],
};

module.exports = config;
