// @ts-check
import {  test, expect } from '@playwright/test';


test('Understading hte browser context ', async ({ browser }) => {

    // when you declare the following two lines, you are redefing the normal process that playwright makes
    // behind the scenes, those configuration are specially helpfull when you want to customize 
    // the context of your broswer for the test cases that you will run
    // remember that you can customize the cookies the cache, proxy and a lot of different things doing this configuraciotn 


    const browserContext = await browser.newContext();
    const myPAge = await browserContext.newPage();


    await myPAge.goto('https://google.com');


});


test('has title', async ({ page }) => {
  await page.goto('https://google.com');

  // remember that in order to make sure that all the step are run secuentially you need always put the await in each line of your code
  await expect(page).toHaveTitle('Google');
  await new Promise(resolve => setTimeout(resolve, 5000));

});

test.only('First test on web application using type clicking and grap the text of elements', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshetty');
    await page.locator('[type="password"]').fill('learning');

    // also remember that when one classs into the down is separate with spaces you can replace those spaces with dots to 
    // create a selector using the class completly
    //              class="btn btn-info btn-md"
    // css selector -> .btn.btn-info.btn-md


    await page.locator('.btn.btn-info.btn-md').click();

    //here in the css selector you can put * astericks before the equal symbol just to get the element that has that partial text
    // you are gonna get the elements that their attributes constains that partial value
    console.log( await page.locator('div[style*="block"]').textContent());

    // remrmeber that each assertion will be wait until the timeout that you define in playwright to passs in another way a timeout will be throw out
    await expect(page.locator('div[style*="block"]')).toContainText('Incorrect');



});
