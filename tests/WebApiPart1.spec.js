import {request, test, expect} from "@playwright/test";

const loginPayload = {userEmail:"test123daniel@email.com",userPassword:"123password"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let token;
let orderId;
test.beforeAll(async ()=> {

    const apiContext = await request.newContext();
    const logiResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload});

    expect(logiResponse.ok()).toBeTruthy();
    // here we need to use wait to extract the json since if we don't use it, the promise would be resolved and we will get a 
    // promise whit pendind statsu instead of the value that we need.
    token = (await logiResponse.json()).token;
    console.log(token);


    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {data : orderPayload,
        headers : {
                    'Authorization':token,
                    'Content-Type':'application/json'}
        }); 

    expect(orderResponse.ok()).toBeTruthy();
    // here we need to use await because we need to wait for the response and then we can extract the order id from the response,
    //  if we don't use await we will have a promise and not the value that we need.  
    orderId = (await orderResponse.json()).orders[0];
    console.log(orderId);



})


test('APi testing', async ({page}) => {
  const producName = 'ZARA COAT 3'
  
await page.addInitScript(value => {
    window.localStorage.setItem('token',value);
  },token);
await page.goto('https://rahulshettyacademy.com/client/');

console.log("this is the order id that will be used: " + orderId);

await page.getByRole("listitem").getByRole("button", {name:"ORDERS"}).click();  
await page.locator('table thead').waitFor();

await page.locator('tbody tr')
  .filter({ has: page.getByText(orderId.replace(/[| ]/g, "")) })
  .locator('td button')
  .first()
  .click();


} )