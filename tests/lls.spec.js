import {test,expect} from '@playwright/test';

test("Playwright Special Locator",async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Employed").check();
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page. getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("Password123");
    await page.getByRole("button", {name:"Submit"}).click();
    await page.getByText("The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();




});