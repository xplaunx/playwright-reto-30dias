import { expect, test } from '@playwright/test'
import { LoginPage } from './pageobjects/LoginPage'

test('login hrm', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

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
