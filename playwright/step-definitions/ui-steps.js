const {HomePage} = require('../pages/home-page');
const {Given, When, Then} = require('@cucumber/cucumber');
const homePage = new HomePage();


Given(/^I visit (TIMZTOS SOLUTIONS)$/, async function (pageTitleSubstring) {
    await homePage.navigateToUrl(pageTitleSubstring);
});

When(/^I navigate to the (.*) page$/,async function (deepLink) {
    await homePage.navigateUsingDeepLink(deepLink);
});
Then(/^page should have text : (.*)$/,async function (text) {
    await homePage.validateTextOnPage(text);
});
