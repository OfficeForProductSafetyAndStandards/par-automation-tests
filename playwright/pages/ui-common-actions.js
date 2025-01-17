const {expect} = require('@playwright/test');

class UiCommonActions {

    async openUrl(url) {
        return page.goto(url);
    }

    async verifyPageTitleHas(pageTitleSubString) {
        let url = await page.title();
        return expect(url).toContain(pageTitleSubString);
    }

    async sendKeys(locator, text) {
        const element = page.locator(locator);
        await element.waitFor({state: 'visible', timeout: 5000});
        return element.fill(text);
    }

    async clickOnElement(locator) {
        const element = page.locator(locator);
        await element.waitFor({state: 'visible', timeout: 5000});
        await element.scrollIntoViewIfNeeded();
        await element.click();
    }

    async elementShouldHaveText(locator, text) {
        const element = page.locator(locator);
        await element.waitFor({ state: 'visible', timeout: 10000 });
        await expect(element).toHaveText(text, { timeout: 5000 });
        console.log(`✅ Text "${text}" is visible on the page.`);
    }
}

module.exports = UiCommonActions;
