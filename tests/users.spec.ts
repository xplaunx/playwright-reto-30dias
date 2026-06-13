import { expect, test } from "@playwright/test"

test('get all usernames registred', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()

    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row') //obtenemos la información de todas las filas de la tabla
    const usernames: string[] = [] //definimos un arreglo de usernames vacio

    const rowCount = await rows.count() //obtenemos la cantidad de filas que tiene la tabla

    for(let i=1; i<rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(1) //nth(i) filas luego nth(1) columna 1, empieza en 0
        const username = await cell.textContent() //capturar el valor que se encuentra en la celda

        if(username){ //si el username no viene null agregue el valor al arreglo
        usernames.push(username)
        }
    }
    console.log(usernames)

})

test('get all employee name registred', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()

    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row') //obtenemos la información de todas las filas de la tabla
    const employenames: string[] = [] //definimos un arreglo de usernames vacio

    const rowCount = await rows.count() //obtenemos la cantidad de filas que tiene la tabla

    for(let i=1; i<rowCount; i++){
        const cell = rows.nth(i).getByRole('cell').nth(3) //nth(i) filas luego nth(1) columna 1, empieza en 0
        const employname = await cell.textContent() //capturar el valor que se encuentra en la celda

        if(employname){ //si el username no viene null agregue el valor al arreglo
        employenames.push(employname)
        }
    }
    console.log(employenames)

})