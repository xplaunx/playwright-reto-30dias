import { expect, test } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'
import { SideMenuOption, SidePanel } from '../components/SidePanel'

test('login to hrm', async ({ page }) => {
/*
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()*/

    await page.goto("/web/index.php/dashboard/index")

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.searchOptionMenu('Dashboard')

})

test('login to hrm 2', async ({ page }) => {
/*
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()*/

    await page.goto("/web/index.php/dashboard/index")

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

})

test('login hrm with employ', async ({ page }) => {

    await page.goto("/web/index.php/dashboard/index")

    const sidePanel = new SidePanel(page)
    await expect(page.getByRole('link', { name: 'Time' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Admin' })).toBeHidden()

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
