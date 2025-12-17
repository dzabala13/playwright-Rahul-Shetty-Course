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


test.only('has title', async ({ page }) => {
  await page.goto('https://google.com');

  // remember that in order to make sure that all the step are run secuentially you need always put the await in each line of your code
  await expect(page).toHaveTitle('Google');
  await new Promise(resolve => setTimeout(resolve, 5000));

});
