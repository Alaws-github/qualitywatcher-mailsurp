module.exports = {
    clearThenSetValue: async function (element, value) {
        await element.waitForDisplayed();
        await element.clearValue();
        await element.setValue(value);
    },

    isElementDisplayedOnPage: async function (element) {
        await element.waitForExist({ timeout: 20000 });
        const isDisplayed = await element.isDisplayed();
        return isDisplayed;
    },

    hoverOnElement: async function (element) {
        await element.waitForExist({ timeout: 20000 });
        await element.moveTo();
    },

    getTextOnElement: async function (element) {
        await element.waitForDisplayed({ timeout: 20000 });
        const text = await element.getText();
        return text;
    }
  };
  