class Header {
    get logo() { return $('.logo'); }
    get avatarCircle() { return $('.ant-avatar-circle'); }
    get logoutLink() { return $('.anticon-logout'); }

    /**
     * 
     * @returns true if the logo is displayed in the page header
     */
    async isLogoDisplayed () {
        const logo = await this.logo;
        const isDisplayed = await browser.isElementDisplayedOnPage(logo);
        return isDisplayed;
    }

    /**
     * 
     * @returns true if the avatar circle is displayed in the page header
     */
    async isAvatarDisplayed () {
        const avatar = await this.avatarCircle;
        const isDisplayed = await browser.isElementDisplayedOnPage(avatar);
        return isDisplayed;
    }

    /**
     * Hovers on the avatar in the page header
     */
    async hoverOnAvatar () {
        await browser.hoverOnElement(this.avatarCircle);
    }
}

export default new Header();
