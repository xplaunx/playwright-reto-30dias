import {expect, test} from '@playwright/test'

test('login hrm', async({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible()

})


test('login incorrect user hrm', async({page}) => {

await page.goto('https://opensource-demo.orangehrmlive.com/')
await page.getByRole('textbox', {name: 'Username'}).fill('UsuarioNoExiste')
await page.getByRole('textbox', {name: 'Password'}).fill('admin123')
await page.getByRole('button', {name: 'Login'}).click()

await expect(page.getByText('Invalid credentials')).toBeVisible()

})


test('login hrm incorrect password', async({page}) => {

await page.goto('https://opensource-demo.orangehrmlive.com/')
await page.getByRole('textbox', {name: 'Username'}).fill('Admin')
await page.getByRole('textbox', {name: 'Password'}).fill('Incorrecta')
await page.getByRole('button', {name: 'Login'}).click()

await expect(page.getByText('Invalid credentials')).toBeVisible()


})
