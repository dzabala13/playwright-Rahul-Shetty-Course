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
  const countryName = 'India';
   

  await pomanager.loginPage.goTo();
  await pomanager.loginPage.validateLogin(username, password);

  await pomanager.dashboardPage.addProductTocart(producName);
  await pomanager.dashboardPage.goToCart();

  await pomanager.myCartPage.validateProduct(producName);
  await pomanager.myCartPage.goToCheckout();

  await pomanager.orderPage.selectCountry(countryName);
  await pomanager.orderPage.placeOrder();

  await pomanager.orderConfirmationPage.validationOrderBookedCorrectly();
  const orderID = (await pomanager.orderConfirmationPage.getOrderId()).replace(/[| ]/g, "");
  await pomanager.orderConfirmationPage.goToOrderHistoryPage();

  await pomanager.orderHistoryPage.selectOneOrder(orderID);

  console.log(await page.locator('div.col-text.-main').textContent())

})