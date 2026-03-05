class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailTextBox = page.getByPlaceholder("email@example.com")
        this.passwordTextBox = page.getByPlaceholder("enter your passsword")
        this.loginButton = page.getByRole("button", { name: "Login" })
    }

    async  goTo() {
       await this.page.goto('https://rahulshettyacademy.com/client');
    }

    

    async validateLogin(username, password) {

        await this.emailTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");

    }





}

module.exports = { LoginPage }