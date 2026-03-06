import { expect } from '@playwright/test';


class MyCartPage {

    constructor(page) {

        this.page = page
        this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
      
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
    async validateProduct(producName) {
        await expect(this.page.getByText("ZARA COAT 3")).toBeVisible();


    }



}


export { MyCartPage }