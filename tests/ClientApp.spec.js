import {  test, expect } from '@playwright/test';


test('Understading hte browser context ', async ({ page }) => {

    const email = "test123daniel@email.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Test#1234567890");
    await page.locator("[value='Login']").click();

    // when we need to wait dinamicaly for and event occur in the page like that all the page load before to 
    // perform an action that doesnt have autowait you can use the following to option to wait:
    // in this case is that you are using allTextContents() whics as we saw before doesnt have autowait

    // #option 1: with this method you can wait until there have been no network conneciton, that means that all 
    // the request, that you web page has done, has finished.
    await page.waitForLoadState('networkidle');

    // #option 2: this will just wait for a specific element to be present before to go to the next step
    
    await page.locator(".card-body b").first().waitFor();
    
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 


});
