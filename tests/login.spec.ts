import { expect, test } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'
import { SideMenuOption, SidePanel } from '../components/SidePanel'

test('login hrm', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.searchOptionMenu('Dashboard')


})


test('login incorrect user hrm', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('UsuarioNoExiste', 'admin123')

    await expect(page.getByText('Invalid credentials')).toBeVisible()

})


test('login hrm incorrect password', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'INCORRECTA')

    await expect(page.getByText('Invalid credentials')).toBeVisible()


})
