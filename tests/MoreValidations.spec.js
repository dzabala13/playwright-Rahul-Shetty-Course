import { test,  expect } from "@playwright/test"

test("Going forward and backward with Playwright", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await page.goto("https://google.com")
await page.goBack();
await page.goForward(); 

})

test("Hanling hidden elements", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();

})

test("handling pop ups in Playwright", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    /** In this part the method on, help us to wait for an event and that 
     * doesn't need to happen inmediatly, we declare these if that event appear due to 
     * and acction that we perform in the future, the event will be trigger in this way.
     * we can handle the dialogs or java pop ups.
     */
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
})

test("making hover action in Playwirght", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#mousehover").hover();

})


test("working with Iframes in playwirght", async ({page})=>{


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const frame= page.frameLocator("#courses-iframe");

    await frame.getByRole("link", {name : "All Access Plan"}).click();
    await frame.locator(".text h2").textContent().then(text => console.log(text));
})

test("Screenshots & Visual comparision", async ({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
// here you are taking a screenshot of an specific element using a locator and then using the method screenshot.
await page.locator('#displayed-text').screenshot({path : 'partialScreenshot.png'})
await page.locator("#hide-textbox").click();
// in this part you are taking a screenshot of the whole page and it will be saved in the path that you define.
await page.screenshot({path : 'screenshot.png'});
await expect(page.locator("#displayed-text")).toBeHidden();

})

test('Visual comparision', async ({page}) => {
// in this part you are making a comparation pyxel by pixel with a baseline images

/** here there are some important aspect that you need to take in mind for this, the first 
 * one is that:
 * 
 * The first time that you run the test, the test will fail since you dont have a baseline images which you can 
 * use to compare the current status of your web page, so in this first time playwright will create a baseline imagen for this 
 * 
 * 
 * The second thing that you need to have in mind is that:
 * you need to be sure that anythign will change between your baseline imagen and the current status of your application since 
 * doesn't matter if there is a small change for an animation of an clock that you have in your web, thta will make that the test fail.
 */
await page.goto("https://mail.google.com/mail/u/0/#inbox");
expect(await page.screenshot()).toMatchSnapshot('landing.png')

})
