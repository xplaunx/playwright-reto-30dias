import { Locator, Page } from "@playwright/test";

export class LoginPage {

    //readonly nos ayuda que la asignación de los elementos se haga una sola vez
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: 'Username' }); //asignamos los localizadores en el constructor
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async doLogin(username: string, password: string) {

        await this.page.goto('/web/index.php/auth/login')
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()

    }

}