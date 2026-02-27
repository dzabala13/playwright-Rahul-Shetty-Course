import {test, expect} from '@playwright/test';
let webContext;


test.beforeAll(async ({browser}) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  const username = 'test123daniel@email.com';
  const password = '123password'
 

  await page.getByPlaceholder("email@example.com").fill(username);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.getByRole("button", {name:"Login"}).click();
  await page.locator("img.card-img-top").first().waitFor();
  await page.waitForLoadState("networkidle");

  // here we are using the context object to save the state of the browser after login,
  // that will create a json file with the name state.json and we can use that file to create a new browser context, which means 
  // that you will be able to create a new page with the same state or context that you have when you loggined in.
  await context.storageState({path : 'state.json'});
  webContext = await browser.newContext({storageState : 'state.json'});


})

test('Web API part 2', async () =>{

   const producName = 'ZARA COAT 3'

   // here you are using the new context that you have created previously with the state of the browser after login,
   // so do you don't need to log in again, you can just create a new page with the same state and you will able to access to the page 
   // without log in again.
   const page = await webContext.newPage();
   await page.goto('https://rahulshettyacademy.com/client');
   await page.locator('.card-body')
    .filter({ hasText: producName }) // Simplest way to filter by text anywhere in the card
    .getByRole('button', { name: 'Add To Cart' })
    .click();

  await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
  
  await page.locator("img.itemImg").first().waitFor();
  
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button",{name:"Checkout"}).click(); 
  
  await page.getByPlaceholder("Select Country").pressSequentially('Ind', {delay : 150});
  await page.getByRole("button",{name:"India"}).last().click();
  await page.getByText("PLACE ORDER").click();


  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

  //const orderID  = await page.locator('label.ng-star-inserted').textContent();
  const orderID  = (await page.locator('label.ng-star-inserted').textContent()) ?? '';

  console.log(orderID);

  // here you can have que the li items using the role listitems and then filter the buttons by name that is so usefull
await page.getByRole("listitem").getByRole("button", {name:"ORDERS"}).click();  
await page.locator('table thead').waitFor();

// gemini version 2
  await page.locator('tbody tr')
  .filter({ has: page.getByText(orderID.replace(/[| ]/g, "")) })
  .locator('td button')
  .first()
  .click();

console.log(await page.locator('div.col-text.-main').textContent())



});

test('test 2', async () =>{

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 

});
