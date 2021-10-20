import loginPage from '../../../pages/login/login.page';
import registerPage from '../../../pages/register/register.page';
import userData from '../../../data/users.data';
import projectsPage from '../../../pages/projects/projects.page';
import projectData from '../../../data/project.data';
const MailSlurp = require("mailslurp-client").default;


describe('Registration for QualityWatcher', () => {

    it('Admin user sign up with valid email and valid password', async () => {
        const mailSlurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
        console.log(inbox);

        loginPage.open();
        await loginPage.clickForSignUpForAccount();
        await registerPage.signUp(userData.registerUser.firstName, userData.registerUser.lastName, userData.registerUser.workspaceName,inbox.emailAddress, userData.registerUser.password);
        await registerPage.checkEmailVerificationSentModel();
        await registerPage.clickEmailVerificationSentModelOkButton();
    });

    it('New admin can complete the tour at first log in', async () => {
        const mailSlurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
        const inbox = await mailSlurp.createInbox();
        console.log(inbox);

        loginPage.open();
        await loginPage.clickForSignUpForAccount();
        await registerPage.signUp(userData.registerUser.firstName, userData.registerUser.lastName, userData.registerUser.workspaceName,inbox.emailAddress, userData.registerUser.password, userData.registerUser.password, true);
        await registerPage.checkEmailVerificationSentModel();
        await registerPage.clickEmailVerificationSentModelOkButton();

        const email = await mailSlurp.waitForLatestEmail(inbox.id);
        let linkUrlList = email.body.match(REG_EMAIL_VERIFICATION_LINK_LIST)
        let confirmationUrl = linkUrlList[1];
        console.log('THIS IS OUR LINK '+ confirmationUrl);
        await browser.newWindow(confirmationUrl);
        await registerPage.clickOnGoToLoginPage();
        await loginPage.login(inbox.emailAddress, userData.registerUser.password);
        await projectsPage.goThroughIntroModal();
        await projectsPage.createTheFirstProject(projectData.project.name, projectData.project.description, projectData.project.type);
        expect(await projectsPage.projectCreatedConfirmModal).toBeExisting();

    });

    it('Verify that a user cannot register with invalid email', async () => {
        loginPage.open();
        await loginPage.clickForSignUpForAccount();
        await registerPage.signUp(userData.registerUserWithInvalidData.firstName, userData.registerUserWithInvalidData.lastName, userData.registerUserWithInvalidData.workspaceName, userData.registerUserWithInvalidData.email, userData.registerUser.password, userData.registerUser.password, true);
        let emailErrMsg = await registerPage.getEmailInvalidErrorMessage("The input is not valid E-mail!");
        expect(emailErrMsg).toHaveText("The input is not valid E-mail!");
    });

    it('Verify that a user Cannot sign up with invalid password', async () => {
        loginPage.open();
        await loginPage.clickForSignUpForAccount();
        await registerPage.signUp(userData.registerUserWithInvalidData.firstName, userData.registerUserWithInvalidData.lastName, userData.registerUserWithInvalidData.workspaceName, userData.registerUser.email, userData.registerUserWithInvalidData.password, userData.registerUserWithInvalidData.passwordConfirm, true);
        let passwordErrMsg = await registerPage.getPasswordInvalidErrorMessage()
        expect(passwordErrMsg).toHaveText("Password should be at least 8 characters long, including at least 1 uppercase, 1 lowercase, 1 digit and 1 symbol");
        let passwordConfirmErrMsg = await registerPage.getPasswordConfirmInvalidErrorMessage()
        expect(passwordConfirmErrMsg).toHaveText("The two passwords that you entered do not match!");
    });

    it('Cannot sign up without agreeing with terms and conditions', async () => {
        loginPage.open();
        await loginPage.clickForSignUpForAccount();
        await registerPage.signUp(userData.registerUser.firstName, userData.registerUser.lastName, userData.registerUser.workspaceName, userData.registerUser.email, userData.registerUser.password, userData.registerUser.password, false);
        let termsErrMsg = await registerPage.getTermsAndConditionsErrorMessage();
        expect(termsErrMsg).toHaveText("The Terms and Conditions must be accepted.");
    });
});