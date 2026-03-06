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

import placeOrderTestData from './utils/placeOrderTestData.json';

test('first end to end testing', async ({ page }) => {

  const pomanager = new POManager(page);
  const placeOrderTestDataJson = JSON.parse(JSON.stringify(placeOrderTestData));   

  await pomanager.loginPage.goTo();
  await pomanager.loginPage.validateLogin(placeOrderTestDataJson.username, placeOrderTestDataJson.password);

  await pomanager.dashboardPage.addProductTocart(placeOrderTestDataJson.productName);
  await pomanager.dashboardPage.goToCart();

  await pomanager.myCartPage.validateProduct(placeOrderTestDataJson.productName);
  await pomanager.myCartPage.goToCheckout();

  await pomanager.orderPage.selectCountry(placeOrderTestDataJson.countryName);
  await pomanager.orderPage.placeOrder();

  await pomanager.orderConfirmationPage.validationOrderBookedCorrectly();
  const orderID = (await pomanager.orderConfirmationPage.getOrderId()).replace(/[| ]/g, "");
  await pomanager.orderConfirmationPage.goToOrderHistoryPage();

  await pomanager.orderHistoryPage.selectOneOrder(orderID);

  console.log(await page.locator('div.col-text.-main').textContent())

})