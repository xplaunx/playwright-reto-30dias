import { Locator, Page } from "@playwright/test";

export class QualificationsMenu {

    readonly page: Page
    readonly qualifications: Locator
    readonly skillsOption: Locator
    readonly educationOption: Locator

    constructor(page: Page) {
        this.page = page
        this.qualifications = page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications')
        this.skillsOption = page.getByRole('menuitem', { name: 'Skills' })
        this.educationOption = page.getByRole('menuitem', { name: 'Education' })
    }

    async clickOnQualifications() {
        await this.qualifications.click()
    }

    async clickOnSkillsOption() {
        await this.clickOnQualifications()
        await this.skillsOption.click()
    }

    async clickOnEducationOption() {
        await this.clickOnQualifications()
        await this.educationOption.click()
    }

}
