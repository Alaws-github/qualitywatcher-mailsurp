class registerPage {

    get firstNameField() { return $('#register_firstName'); }
    get lastNameField() { return $('#register_lastName'); }
    get workspaceNameField() { return $('#register_workspaceName'); }
    get emailField() { return $('#register_email'); }
    get passwordField() { return $('#register_password'); }
    get confirmPasswordField() { return $('#register_confirm'); }
    get termsAndAgreeTickBox() { return $('#register_agreement'); }
    get registerButton() { return $('button[type="submit"]'); }
    get emailVerificationSentModel() { return $('.ant-modal-content'); }
    get emailVerificationSentModelTitle() { return $('.ant-modal-confirm-title'); }
    get emailVerificationSentModelOkButton() { return $('button[type="button"]') }
    get goToLoginPageButton() { return $('button=Go To Login Page') }

    async signUp(firstName, lastName, workspaceName, email, password, passwordConfirm, agreeToTerms) {
        if (agreeToTerms) {
            await this.firstNameField.setValue(firstName);
            await this.lastNameField.setValue(lastName);
            await this.workspaceNameField.setValue(workspaceName);
            await this.emailField.setValue(email);
            await this.passwordField.setValue(password);
            await this.confirmPasswordField.setValue(passwordConfirm);
            await this.termsAndAgreeTickBox.click();
            await this.registerButton.click();
        } else {
            await this.firstNameField.setValue(firstName);
            await this.lastNameField.setValue(lastName);
            await this.workspaceNameField.setValue(workspaceName);
            await this.emailField.setValue(email);
            await this.passwordField.setValue(password);
            await this.confirmPasswordField.setValue(password);
            await this.registerButton.click();
        }
    }

    async checkEmailVerificationSentModel() {
        await this.emailVerificationSentModel.isExisting()
        expect(await this.emailVerificationSentModelTitle).toHaveText('Email Verification Sent!');
    }

    async clickEmailVerificationSentModelOkButton() {
        await this.emailVerificationSentModelOkButton.click();
    }

    async clickOnGoToLoginPage() {
        await this.goToLoginPageButton.waitForExist({ timeout: 30000 });
        await this.goToLoginPageButton.click();
    }

    async getEmailInvalidErrorMessage() {
        const input = await this.emailField.parentElement();
        const inputForm = await input.parentElement();
        const inputFormControl = await inputForm.parentElement();
        return await inputFormControl.$('.ant-form-item-explain-error').getText();
    }

    async getPasswordInvalidErrorMessage() {
        const span = await this.passwordField.parentElement();
        const input = await span.parentElement();
        const inputForm = await input.parentElement();
        const inputFormControl = await inputForm.parentElement();
        return await inputFormControl.$('.ant-form-item-explain-error').getText();
    }

    async getPasswordConfirmInvalidErrorMessage() {
        const span = await this.confirmPasswordField.parentElement();
        const input = await span.parentElement();
        const inputForm = await input.parentElement();
        const inputFormControl = await inputForm.parentElement();
        return await inputFormControl.$('.ant-form-item-explain-error').getText();
    }

    async getTermsAndConditionsErrorMessage() {
        const input = await $('.ant-checkbox-wrapper').parentElement();
        const inputForm = await input.parentElement();
        const inputFormControl = await inputForm.parentElement();
        return await inputFormControl.$('.ant-form-item-explain-error').getText();
    }

    open() {
        browser.url('register');
    }
}
export default new registerPage();