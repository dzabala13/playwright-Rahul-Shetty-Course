import {request, test, expect} from "@playwright/test";
import { ApiUtils }  from "./utils/ApiUtils";

const loginPayload = {userEmail:"test123daniel@email.com",userPassword:"123password"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
const fakePayLoadOrders = { data: [], message: "No Orders" };
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

// Here we are intercepting the request that we are doing to the endpoint
//  'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', and we are mocking the response
//  that we will get from that endpoint, so instead of getting the real response from the server,
//  we will get the fake response that we have created, and you can see in the browser that there are no orders, 
// because we are sending an empty array as a response

console.log("this is the order id that will be used: " + response.orderId);

// here you are saying that we want to route this request to this especific endpoint, the * at the end of the url, it is beacuse 
// we are saying that any endpoint that has that strucuture should be intercepted no maters the end of the endpoint
await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
  async route => {

    // in this part you are fetching the request that you are doing to that specefici endpoint, and you are saving the response in a variable,
    //  that response is the real response that you will get from the server, but we are going to modify it and send a fake response to the browser
    const response = await page.request.fetch(route.request());
    // this part is so important since you need to give the new response as a JSON object, because if you send it as a JS object 
    // the browser wont understand the response and you wont see the expected result in the browser 
    let body = JSON.stringify(fakePayLoadOrders);

    // here you are fulfilling the request with the new response that you have created, so instead of getting the real response from the server,
    //  you will get the fake response that you have created, and you can see in the browser that there are no orders, because we are sending 
    // an empty array as a response
    route.fulfill({
      // here we are passing the response object beacuse that will help us to keep the same status code 
      // and headers that we have in the real response, but we are changing the body of the response to 
      // the fake response that we have created
        response,
        body,

    })

  }
)


await page.getByRole("listitem").getByRole("button", {name:"ORDERS"}).click();

// in this part you are waiting for the response that you are intercepting, because if you don't wait for the response, 
// you will get an playwirght error because you are trying to mock the response but the request is not done yet, so you need to wait for the 
// request to be done before you can mock the response 
await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')

console.log(await page.locator('.mt-4').textContent())

} )