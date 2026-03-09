
import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POMonager'
import { customTest } from './utils/test-base';
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



const placeOrdersTestDataJsons = JSON.parse(JSON.stringify(placeOrderTestData));

for (const placeOrderTestDataJson of placeOrdersTestDataJsons) {

  test(`first end to end testing for ${placeOrderTestDataJson.productName}`, async ({ page }) => {

    const pomanager = new POManager(page);

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
}
 
// here instead of using the test that we import from playwright we are using the customTest that we create in the test-base.js file,
// and that is because we want to use the fixture that we create in that file, and that fixture is called testDataForOrder, 
// and that fixture is an object that contains the data for the order, and that data is used in the test case, and that is a way to manage
//  the test data in a more efficient way, and also to avoid hardcoding the data in the test case, and also to make the test case more 
// readable and maintainable.
customTest('test case using a new fixture for managin the test data', async ({ page, testDataForOrder }) => {

  const pomanager = new POManager(page);

  await pomanager.loginPage.goTo();
  await pomanager.loginPage.validateLogin(testDataForOrder.username, testDataForOrder.password);

  await pomanager.dashboardPage.addProductTocart(testDataForOrder.productName);
  await pomanager.dashboardPage.goToCart();

  await pomanager.myCartPage.validateProduct(testDataForOrder.productName);
  await pomanager.myCartPage.goToCheckout();

  await pomanager.orderPage.selectCountry(testDataForOrder.countryName);
  await pomanager.orderPage.placeOrder();

  await pomanager.orderConfirmationPage.validationOrderBookedCorrectly();
  const orderID = (await pomanager.orderConfirmationPage.getOrderId()).replace(/[| ]/g, "");
  await pomanager.orderConfirmationPage.goToOrderHistoryPage();

  await pomanager.orderHistoryPage.selectOneOrder(orderID);

  console.log(await page.locator('div.col-text.-main').textContent())

})

