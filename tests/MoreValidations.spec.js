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