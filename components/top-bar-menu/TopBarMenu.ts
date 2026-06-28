import { Page } from "@playwright/test";
import { UserManagementMenu } from "./UserManagementMenu";
import { JobMenu } from "./JobMenu";
import { QualificationsMenu } from "./QualificationsMenu";
import { OrganizationMenu } from "./OrganizationMenu";

export class TopBarMenu {

    readonly page: Page
    readonly userManagement: UserManagementMenu
    readonly job: JobMenu
    readonly organization: OrganizationMenu
    readonly qualification: QualificationsMenu

    constructor(page: Page){
        this.page = page
        this.userManagement = new UserManagementMenu(page)
        this.job = new JobMenu(page)
        this.organization = new OrganizationMenu(page)
        this.qualification = new QualificationsMenu(page)
    }

    
}