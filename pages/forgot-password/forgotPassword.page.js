class ForgotPassword {

    get emailAddressField() { return $('#register_email'); }
    get sendRecoveryCodeButton() { return $('button=Send Recovery Code'); }
    get verificationSentModalTitle() { return $('.ant-modal-confirm-title=Verification Code Sent!'); }
    get verificationSentModalOkButton() { return $('button=OK'); }
    get verificationCodeField() { return $('#register_code'); }
    get newPasswordField() { return $('#register_newPassword'); }
    get resetPasswordButton() { return $('button=Reset Password'); }
    get passwordResetSuccessfulModalTitle() { return $('.ant-modal-confirm-title=Password Reset Successfully!'); }
    get validationError() { return $('div[role="alert"]'); }
    get invalidVerificationCodeAlert() { return $('.ant-notification-notice-message'); }


    async sendRecoveryCodeToEmail(email) {
        await this.emailAddressField.waitForDisplayed({ timeout: 10000 });
        await this.emailAddressField.setValue(email);
        await this.sendRecoveryCodeButton.click();
    } 

    async resetPasswordWithCode(code, password) {
        await this.verificationCodeField.setValue(code);
        await this.newPasswordField.setValue(password);
        await this.resetPasswordButton.click();
    }
}

export default new ForgotPassword();