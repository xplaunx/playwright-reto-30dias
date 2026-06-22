import { expect, Locator, Page } from "@playwright/test";


export class SidePanel {

    readonly page: Page
    readonly searchText: Locator

    constructor(page: Page) {
        this.page = page
        this.searchText = page.getByRole('textbox', {name: 'Search'})
    }

    private menuOption(option: SideMenuOption):Locator{
        return this.page.getByRole('link', { name: option })
    }


    async clickOnOption(option: SideMenuOption) {
        await this.menuOption(option).click()
    }

    async searchOptionMenu(textSearch: string){
        await this.searchText.fill(textSearch)
        expect(this.page.getByRole('link', {name: textSearch})).toBeVisible()
    }


}

export enum SideMenuOption{
    ADMIN = 'Admin',
    PIM = 'PIM',
    LEAVE = 'Leave',
    TIME = 'Time',
    RECRUITMENT = 'Recruitment',
    MY_INFO = 'My Info',
    PERFORMANCE = 'Performance',
    DASHBOARD = 'Dashboard',
    DIRECTORY = 'Directory',
    MAINTENANCE = 'Maintenance',
    CLAIM = 'Claim',
    BUZZ = 'Buzz'
}