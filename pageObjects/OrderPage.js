class OrderPage {

    constructor(page) {

        this.page = page
        this.placeOrderButton = this.page.getByText("PLACE ORDER");
        this.countryInput = this.page.getByPlaceholder("Select Country");


    }


    async placeOrder() {
        await this.placeOrderButton.click();
    }
    async selectCountry(countryName) {
        await this.countryInput.pressSequentially(countryName, { delay: 150 });
        await this.page.getByRole("button", { name: countryName }).last().click();
    }


}


export { OrderPage }