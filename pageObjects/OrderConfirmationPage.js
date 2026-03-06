import { expect } from "@playwright/test";


class OrderConfirmationPage {

    constructor(page) {
        this.page = page;
        this.tittleConfirmation = this.page.getByText("Thankyou for the order.");
        this.orderID = this.page.locator('label.ng-star-inserted');
        this.orderOrdersButton = this.page.getByRole("listitem").getByRole("button", { name: "ORDERS" });
        this.tableHeaderOrderHistory = this.page.locator('table thead');

    }


    async validationOrderBookedCorrectly() {
        await expect(this.tittleConfirmation).toBeVisible();
    }
    async getOrderId() {
        return (await this.orderID.textContent())?? '';
    }

    async goToOrderHistoryPage() {
      await this.orderOrdersButton.click();
      await this.tableHeaderOrderHistory.waitFor();
    }


}

export { OrderConfirmationPage }