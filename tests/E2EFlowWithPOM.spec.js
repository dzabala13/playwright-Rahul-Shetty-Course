// @ts-check
import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POMonager'
/** remeber that for import the name of the object of module that you are importin should be the same that you define 
 * as name of the class and the name that you use in the export sentence.
 * 
 * import { POManager } from '../pageObjects/POMonager'
*       ^^^^^^^^^                    ^^^^^^^^^
*    nombre de la clase/export       nombre del ARCHIVO
*    (debe coincidir con             (ruta física del
*    lo que está en module.exports)  archivo en disco)
 */

test('first end to end testing', async ({ page }) => {

  const pomanager = new POManager(page);

  const username = 'test123daniel@email.com';
  const password = '123password'
  const producName = 'ZARA COAT 3'

  await pomanager.loginPage.goTo();
  await pomanager.loginPage.validateLogin(username, password);

  await pomanager.dashboardPage.addProductTocart(producName);
  await pomanager.dashboardPage.goToCart();





  //  await page.locator('.card-body')
  //   .filter({ hasText: producName }) // Simplest way to filter by text anywhere in the card
  //   .getByRole('button', { name: 'Add To Cart' })
  //   .click();
  //
  // await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

  await page.locator("img.itemImg").first().waitFor();

  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially('Ind', { delay: 150 });
  await page.getByRole("button", { name: "India" }).last().click();
  await page.getByText("PLACE ORDER").click();


  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

  //const orderID  = await page.locator('label.ng-star-inserted').textContent();
  const orderID = (await page.locator('label.ng-star-inserted').textContent()) ?? '';

  console.log(orderID);

  // here you can have que the li items using the role listitems and then filter the buttons by name that is so usefull
  await page.getByRole("listitem").getByRole("button", { name: "ORDERS" }).click();
  await page.locator('table thead').waitFor();


  // gemini version 2
  await page.locator('tbody tr')
    .filter({ has: page.getByText(orderID.replace(/[| ]/g, "")) })
    .locator('td button')
    .first()
    .click();

  console.log(await page.locator('div.col-text.-main').textContent())

})