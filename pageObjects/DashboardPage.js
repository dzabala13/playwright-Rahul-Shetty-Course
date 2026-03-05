class DashboardPage {


constructor(page){
    this.page = page
    this.porductCart = page.locator('.card-body');
    this.goToCartButton = page.getByRole("listitem").getByRole("button",{name:"Cart"});
}

async goToCart() {
      await this.goToCartButton.click();

}
async addProductTocart(producName) {
   await this.porductCart
    .filter({ hasText: producName }) // Simplest way to filter by text anywhere in the card
    .getByRole('button', { name: 'Add To Cart' })
    .click();
}




}

module.exports={DashboardPage}