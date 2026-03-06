
class OrderHistoryPage{


    constructor(page){
        this.page=page
        this.orderRow = page.locator('tbody tr');

    }

    async selectOneOrder(orderID) {
    await this.orderRow
    .filter({ has: this.page.getByText(orderID) })
    .locator('td button')
    .first()
    .click();
    }

}

export {OrderHistoryPage}