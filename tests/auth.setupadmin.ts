import {test as setup, expect} from "@playwright/test"
import { LoginPage } from "./pageobjects/LoginPage"

setup('authentication as admin', async({page})=>{

    console.log('Autenticación iniciada usando el setup')
    //iniciar sesión
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    //nos aseguramos que el inicio de sesión es exitoso
    await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()

    //guardar el estado
    await page.context().storageState({path: '.auth/admin.json'})

    console.log('Autenticación completada usando el setup')

})
/*
setup('authentication as Employ', async({page})=>{

    console.log('Autenticación iniciada usando el setup')
    //iniciar sesión
    const loginPage = new LoginPage(page)
    await loginPage.loginAsEmploy()

    //nos aseguramos que el inicio de sesión es exitoso
    await expect(page.getByRole('link', {name:'Time'})).toBeVisible()

    //guardar el estado
    await page.context().storageState({path: '.auth/employ.json'})

    console.log('Autenticación completada usando el setup')

})*/