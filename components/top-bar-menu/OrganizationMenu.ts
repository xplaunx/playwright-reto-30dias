import { Locator, Page } from "@playwright/test";

export class OrganizationMenu {

    readonly page: Page
    readonly organization: Locator
    readonly locationOption: Locator
    readonly structureOptions: Locator

    constructor(page: Page) {
        this.page = page
        this.organization = page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Organization')
        this.locationOption = page.getByRole('menuitem', { name: 'Locations' })
        this.structureOptions = page.getByRole('menuitem', { name: 'Structure' })
    }

    async clickOnOrganization() {
        await this.organization.click()
    }

    async clickOnLocationOption() {
        await this.clickOnOrganization()
        await this.locationOption.click()
    }

    async clickOnStructureOption() {
        await this.clickOnLocationOption()
        await this.structureOptions.click()
    }

}