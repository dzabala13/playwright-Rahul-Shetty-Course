import {request, test, expect} from "@playwright/test";
import { ApiUtils }  from "./utils/ApiUtils";

const loginPayload = {userEmail:"test123daniel@email.com",userPassword:"123password"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response;

test.beforeAll(async ()=> {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

})


test('APi testing', async ({page}) => {
  
await page.addInitScript(value => {
    window.localStorage.setItem('token',value);
  },response.token);
await page.goto('https://rahulshettyacademy.com/client/');

console.log("this is the order id that will be used: " + response.orderId);

await page.getByRole("listitem").getByRole("button", {name:"ORDERS"}).click();  
await page.locator('table thead').waitFor();

await page.locator('tbody tr')
  .filter({ has: page.getByText(response.orderId.replace(/[| ]/g, "")) })
  .locator('td button')
  .first()
  .click();

} )