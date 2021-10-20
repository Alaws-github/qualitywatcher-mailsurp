class ProjectsPage {

    get launchButton() { return $('button[type="button"]'); }
    get projectPageTitleElement() { return $('.ant-page-header-heading-title=Projects'); }
    get welcomeModal() { return $('.ant-modal-content'); }
    get nextStepButton() { return $('button=Next Step'); }
    get enjoyButton() { return $('button=Enjoy!'); }
    get modalImages() { return $$('img[height="470"]'); }
    get projectNameField() { return $('#register_title'); }
    get projectDescriptionField() { return $('#register_description'); }
    get projectType() { return $('#register_type'); }
    get createProjectButton() { return $('button=Create Project'); }
    get projectCreatedConfirmModal() { return $('ant-modal-confirm-title=Project Created Successfully!'); }

    async clickProjectLaunch() {
        await this.launchButton.waitForDisplayed({ timeout: 30000 })
        await this.launchButton.click();
    }

    async waitForUserIsInProjectPage() {
        await this.projectPageTitleElement.waitForDisplayed({ timeout: 30000 })
    }

    async goThroughIntroModal() {
        await this.nextStepButton.waitForExist({ timeout: 30000 });
        let i = 0;
        while(i < 8) {
            await this.nextStepButton.click();
            await browser.pause(2000)
            i++
        }
        await this.enjoyButton.click();
    }

    async createTheFirstProject(projectName, description, type) {
        await this.projectNameField.waitForExist({ timeout: 30000 })
        await this.projectNameField.setValue(projectName);
        await this.projectDescriptionField.setValue(description);
        await this.projectType.setValue(type);
        await this.createProjectButton.click();
    }

    async checkProjectIsCreated() {
        expect(await this.projectCreatedConfirmModal).toBeExisting();
    }

}

export default new ProjectsPage();