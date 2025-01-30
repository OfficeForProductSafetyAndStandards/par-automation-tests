const UiCommonActions = require('./ui-common-actions');
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});


/** Page Elements */
const TEXT_ELEMENT = 'h2';


class HomePage extends UiCommonActions {

    async navigateToUrl(pageTitleSubString) {
        await this.openUrl(process.env.BASE_UI_URL);
        await this.verifyPageTitleHas(pageTitleSubString);
    }

    async navigateUsingDeepLink(deepLink) {
        await this.openUrl(process.env.BASE_UI_URL + deepLink);
    }

    async validateTextOnPage(text) {
        await this.elementShouldHaveText(TEXT_ELEMENT, text);
    }
}

module.exports = {HomePage: HomePage};


