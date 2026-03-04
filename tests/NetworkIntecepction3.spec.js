// @ts-check
import { test, expect } from '@playwright/test';




test('FUnderstanding better the syncronizations mechanism', async ({ page }) => {
  
  // here we are intercepting the request that the browser is sending to get the css of the page or their resource type is stylesheer,
  //  and we are blocking it, this is a good practice to make our test run faster since we are not loading the css of the page, this is specially 
  // helpfull when you are testing a web application that has a lot of css and you are not interested in testing the css 
  // of the page, this is a good practice to make your test run faster and more stable since you are not loading the css of the page,
  //  this is specially helpfull when you are testing a web application that has a lot of css and you are not interested in testing
  //  the css of the page
  await page.route('**/*', (route) => {
    // Bloquea cualquier cosa que el navegador identifique como hoja de estilos
    if (route.request().resourceType() === 'stylesheet') {
      return route.abort();
    }
    return route.continue();
  });
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const loguin = page.locator('#username');
  const password = page.locator('[type="password"]');
  const loguinButton = page.locator('.btn.btn-info.btn-md');



  // Here you are blocking or aborting all the petitions related to images, in this case that could be helpfull if you are not interested in 
  // validation images in your test, in this way you could achive it
  await page.route("**/*.{jpg,png,jpeg}", route => route.abort());

  // here in this part you are making a log of all the request and responses that the browser is doing in background, that could be a 
  // a good option when you are trying to debug your test and you want to see all the request and responses that the browser is doing in background.
  page.on('request',request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status() ));


  await password.fill('Learning@830$3mK2');
  await loguin.fill('rahulshettyacademy');
  await loguinButton.click();

  console.log(await page.locator('.card-body a').first().textContent());
  console.log(await page.locator('.card-body a').nth(1).textContent());
  const allItems = await page.locator('.card-body a').allTextContents();
  console.log(allItems)
});