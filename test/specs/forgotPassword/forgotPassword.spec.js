import loginPage from '../../../pages/login/login.page';
import registerPage from '../../../pages/register/register.page';
import userData from '../../../data/users.data';
import forgotPasswordPage from '../../../pages/forgot-password/forgotPassword.page';
import { REG_EMAIL_VERIFICATION_LINK, REG_VERIFICATION_CODE ,MAILSLURP_EMAIL, MAILSLURP_ID} from '../../../data/constants';
const MailSlurp = require("mailslurp-client").default;


describe('Password reset for QualityWatcher', () => {

    it.only('Verify that the user is able to successfully reset password', async () => {
        const mailSlurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
        
        loginPage.open();
        await loginPage.clickForgotPasswordLink();
        await forgotPasswordPage.sendRecoveryCodeToEmail(MAILSLURP_EMAIL);
        await expect(forgotPasswordPage.verificationSentModalTitle).toBeExisting();
        await forgotPasswordPage.verificationSentModalOkButton.click()
        email = await mailSlurp.waitForLatestEmail(MAILSLURP_ID);
        await forgotPasswordPage.resetPasswordWithCode(code, userData.forgotPassword.password);
        await expect(forgotPasswordPage.passwordResetSuccessfulModalTitle).toBeExisting()
    });

    it('Verify that the user is unable to request a verification code without an email', async () => {
        loginPage.open();
        await loginPage.clickForgotPasswordLink();
        await forgotPasswordPage.sendRecoveryCodeToEmail("");
        await expect(forgotPasswordPage.validationError).toHaveText("Please input your E-mail!")
    });

    it('Verify that the user is not able to reset password with invalid verification code', async () => {
        loginPage.open();
        await loginPage.clickForgotPasswordLink();
        await forgotPasswordPage.sendRecoveryCodeToEmail(userData.forgotPassword.email);
        await expect(forgotPasswordPage.verificationSentModalTitle).toBeExisting();
        await forgotPasswordPage.verificationSentModalOkButton.click()
        await forgotPasswordPage.resetPasswordWithCode(userData.forgotPassword.verificationCode, userData.forgotPassword.password);
        expect(await forgotPasswordPage.invalidVerificationCodeAlert).toHaveText("Invalid verification code provided, please try again.")
    });

    it('Verify that the user is not able to reset password with invalid password', async () => {
        loginPage.open();
        await loginPage.clickForgotPasswordLink();
        await forgotPasswordPage.sendRecoveryCodeToEmail(userData.forgotPassword.email);
        await expect(forgotPasswordPage.verificationSentModalTitle).toBeExisting();
        await forgotPasswordPage.verificationSentModalOkButton.click()
        await forgotPasswordPage.resetPasswordWithCode(userData.forgotPassword.verificationCode, userData.forgotPassword.invalidPassword);
        expect(await forgotPasswordPage.validationError).toHaveText("Password should be at least 8 characters long, including at least 1 uppercase, 1 lowercase and 1 symbol");
    });

    it('Verify that the user email field is pre-filled', async () => {
        loginPage.open();
        await loginPage.clickForgotPasswordLink();
        await forgotPasswordPage.sendRecoveryCodeToEmail("test3@gmail.com");
        await expect(forgotPasswordPage.verificationSentModalTitle).toBeExisting();
        await forgotPasswordPage.verificationSentModalOkButton.click()
        await expect(forgotPasswordPage.emailAddressField).toHaveAttr('value', "test3@gmail.com")
    });
});