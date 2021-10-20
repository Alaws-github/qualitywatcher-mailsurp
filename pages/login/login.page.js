class LoginPage {

    get userNameField() { return $('#register_email'); }
    get passwordField() { return $('#register_password'); }
    get submitBtn() { return $('button[type="submit"]'); }
    get signUpLink() { return $('a[href="/register"]'); }
    get popUpMessage() { return $('.ant-notification-notice-message'); }
    get passwordHelperText() { return $('[role="alert"]'); }

    /**
     * Enters e-mail
     * @param {string} email 
     */
    async enterUsername(email) {
        await browser.clearThenSetValue(this.userNameField, email);
    }

    /**
     * Enters password
     * @param {string} password 
     */
    async enterPassword(password) {
        await browser.clearThenSetValue(this.passwordField, password);
    }

    /**
     * Click the Login button
     */
    async clickLoginButton() {
        await this.submitBtn.waitForClickable();
        await this.submitBtn.click();
    }

    /**
     * Logs in the user
     * @param {string} username 
     * @param {string} password 
     */
    async login(username , password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Clicks the sign up link
     */
    async clickForSignUpForAccount() {
        await this.signUpLink.click();
    }

    /**
     * 
     * @returns the text on the pop message that appears after the log in button is clicked
     */
    async getPopMessage () {
        const popUp = await this.popUpMessage;
        const text = await browser.getTextOnElement(popUp);
        return text;
    }

    /**
     * 
     * @returns the helper text on the password field
     */
    async getPasswordHelperText () {
        const text = await browser.getTextOnElement(this.passwordHelperText);
        return text;
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.waitForDisplayed({ timeout: 30000 })
        await this.forgotPasswordLink.click();
    }

    open() {
        browser.url('login');
    }
}
export default new LoginPage();
