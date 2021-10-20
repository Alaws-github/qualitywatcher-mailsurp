import LoginPage from '../../../pages/login/login.page';
import UserData from '../../../data/users.data';
import Header from '../../../pages/header/header.page';
const { assert } = require('chai');

describe('Viewer User Authentication', () => {
    beforeEach('', async () => {
        await LoginPage.open();
    });

    it('Should login the viewer user with a registered email and valid password', async () => {
        // Logs in the user
        await LoginPage.login(UserData.viewerUser.username, UserData.viewerUser.password);

        // Verify the user sees the logo
        const isLogoDisplayed = await Header.isLogoDisplayed();
        assert.equal(true, isLogoDisplayed, 'Expected the logo to be displayed.');

        // Verify that the user sees the avatar circle
        const isAvatarDisplayed = await Header.isAvatarDisplayed();
        assert.equal(true, isAvatarDisplayed, 'Expected the avatar circle to be displayed.');    
    });

    it('Should not login the viewer user with invalid email and valid password', async () => {
        // Logs in the user
        await LoginPage.login(UserData.invalid.username, UserData.viewerUser.password);

        // Verify that warning is displayed
        const text = await LoginPage.getPopMessage();
        assert.equal('Incorrect username or password.', text, 'Expected the pop up message to display "Incorrect username or password.".');    
    });

    it('Should not login the viewer user with valid email and no password', async () => {
        // Logs in the user
        await LoginPage.login(UserData.viewerUser.username, "");

        // Verify that warning is displayed
        const text = await LoginPage.getPasswordHelperText();
        assert.equal('Please input your Password!', text, 'Expected the pop up message to display "Please input your Password!".');  
    });

    it('Should not login the viewer user with valid email and incorrect password', async () => {
        // Logs in the user
        await LoginPage.login(UserData.viewerUser.username, UserData.invalid.password);

        // Verify that warning is displayed
        const text = await LoginPage.getPopMessage();
        assert.equal('Incorrect username or password.', text, 'Expected the pop up message to display "Incorrect username or password.".');  
    });
});




