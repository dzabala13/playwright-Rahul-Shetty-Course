class DashboardPage {


constructor(page){
    this.page = page
    this.porductCart = page.locator('.card-body');
    this.goToCartButton = page.getByRole("listitem").getByRole("button",{name:"Cart"});
    this.imageProduct= page.locator("img.itemImg");
}

async goToCart() {
      await this.goToCartButton.click();
      await this.imageProduct.first().waitFor();

}
async addProductTocart(productName) {
   await this.porductCart
    .filter({ hasText: productName }) // Simplest way to filter by text anywhere in the card
    .getByRole('button', { name: 'Add To Cart' })
    .click();
}




}

module.exports={DashboardPage}