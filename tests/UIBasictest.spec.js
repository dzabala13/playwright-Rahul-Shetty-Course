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

test('First test on web application using type clicking and grap the text of elements', async ({ page }) => {
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


test.only('FUnderstanding better the syncronizations mechanism', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // web elements you cand define them at the begining , where are you defining the web elememnts you can ommit the await word
    const loguin = page.locator('#username');
    const password =  page.locator('[type="password"]');
    const loguinButton = page.locator('.btn.btn-info.btn-md');


    await loguin.fill('rahulshetty');
    await password.fill('learning');
    await loguinButton.click();
    console.log( await page.locator('div[style*="block"]').textContent());
    await expect(page.locator('div[style*="block"]')).toContainText('Incorrect');

    // when you send the comand fill('') with an empty string that will clean the text box 
    await loguin.fill('');
    await loguin.fill('rahulshettyacademy');
    await loguinButton.click();

    // when you have a selector that return many elements you can use the method first to get just the firs resutl 
    //returned 
    console.log(await page.locator('.card-body a').first().textContent());
    //// As well you have the opportunitu to use nth(#) which is helpful to get one specfici result from the results returned 
    console.log(await page.locator('.card-body a').nth(1).textContent());

    // here you need to pay attention that since this allTextContents() method returns several values it does not have an autowait
    // it just take the current status of the DOM and take the values if there is not values it will returns a empty list
    // this is reason if we just runt this part without run the method textContent() before we will get a empty list since the page has not fully loaded yet.
    // this is beacuse textContent() solve the problem, beacuse this command whether has autowait.
    const allItems = await page.locator('.card-body a').allTextContents();
    console.log(allItems)



});
