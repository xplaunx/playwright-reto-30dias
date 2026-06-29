import { expect, test } from "@playwright/test"
import { LoginPage } from "./pageobjects/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel"

test('get all usernames registred', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()

    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row') //obtenemos la información de todas las filas de la tabla
    const usernames: string[] = [] //definimos un arreglo de usernames vacio

    const rowCount = await rows.count() //obtenemos la cantidad de filas que tiene la tabla

    for (let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(1) //nth(i) filas luego nth(1) columna 1, empieza en 0
        const username = await cell.textContent() //capturar el valor que se encuentra en la celda

        if (username) { //si el username no viene null agregue el valor al arreglo
            usernames.push(username)
        }
    }
    console.log(usernames)

})

test('get all employee name registred', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()

    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row') //obtenemos la información de todas las filas de la tabla
    const employenames: string[] = [] //definimos un arreglo de usernames vacio

    const rowCount = await rows.count() //obtenemos la cantidad de filas que tiene la tabla

    for (let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(3) //nth(i) filas luego nth(1) columna 1, empieza en 0
        const employname = await cell.textContent() //capturar el valor que se encuentra en la celda

        if (employname) { //si el username no viene null agregue el valor al arreglo
            employenames.push(employname)
        }
    }
    console.log(employenames)

})


test('select specific user for edition', async ({ page }) => {

    const userForEdition = 'mike_manager'
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button') //obtenemos la información de la fila de un usuario especifico 
        .filter({ has: page.locator('i.bi-pencil-fill') })

    await pencilToEdit.click()

    const currentUsername = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
        .inputValue()

    expect(currentUsername).toEqual(userForEdition)

    expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(userForEdition)

})


test('select specific user for edition dinamic', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()

    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row') //obtenemos la información de todas las filas de la tabla

    const usernames: string[] = [] //definimos un arreglo de usernames vacio

    const rowCount = await rows.count() //obtenemos la cantidad de filas que tiene la tabla

    for (let i = 1; i < rowCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(1) //nth(i) filas luego nth(1) columna 1, empieza en 0
        const employusername = await cell.textContent() //capturar el valor que se encuentra en la celda

        if (employusername) { //si el username no viene null agregue el valor al arreglo
            usernames.push(employusername)
        }
    }

    const filteredUsers = usernames
        .map(user => user?.trim())
        .filter(user => user && user !== 'Admin') //hacemos un filtro para excluir al Admin de la lista que vamos a utilizar para sacar el random

    if (filteredUsers.length === 0) {
        throw new Error('No hay usuarios válidos para seleccionar')
    }

    const randomIndex = Math.floor(Math.random() * filteredUsers.length) //generamos un número random con respecto al tamaño del arreglo de usernames encontrados
    const userForEdition = filteredUsers[randomIndex] //obtener el usuario del arreglo

    console.log('Usuario aleatorio:', userForEdition)

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })

    await pencilToEdit.click()

    const currentUsername = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
        .inputValue()

    expect(currentUsername).toEqual(userForEdition)

    expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(userForEdition)

})


test('check user role options', async ({ page }) => {

    const expectedRoleOptions = ['-- Select --', 'Admin', 'ESS'];

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[text()='User Role']//parent::div//following-sibling::div").click()
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentUserRoleOptions)

    expect(currentUserRoleOptions, 'The options displayed in the user role dropdown do not match the expected options').toEqual(expectedRoleOptions)

})



test('check status options', async ({ page }) => {

    const expectedStatusOptions = ['-- Select --', 'Enabled', 'Disabled'];

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[text()='Status']//parent::div//following-sibling::div").click()
    const currentStatusOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentStatusOptions)

    expect(currentStatusOptions, 'The options displayed in the status dropdown do not match the expected options').toEqual(expectedStatusOptions)

})


test('Filter by user admin', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    //Filas que contienen el role Admin
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })

    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin users filtered: '+ expectedAdminCount)

    //Aplicar filtro
    await page.locator("//label[text()='User Role']//parent::div//following-sibling::div").click()
    await page.getByRole("listbox").getByRole('option', { name: 'Admin' }).click()
    await page.getByRole('button', {name: 'Search'}).click()

    //la tabla filtrada deberia tener exactamente la misma cantidad que encontramos antes
    await expect(allBodyRows).toHaveCount(expectedAdminCount)

    for (let i=0; i<expectedAdminCount; i++){
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }

})

