import {test , expect} from "@playwright/test";


test('Calendar Validations', async ({ page }) => {


const day = "1"
const motnh ="3"
const year ="1998"

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
//await page.getByRole("link").getByText("Top Deals").click();

await page.locator(".react-date-picker__inputGroup").click();

await page.locator("input[name='year']").fill(year);
await page.locator("input[name='day']").fill(day);
await page.locator("input[name='month']").fill(motnh);


/*how the page is built with React that means the elements or the way how the elements are showed is different,
 for that reason getText() doesn't work here for that reason we should use inputValue() to get the attribute value.

also we are using expect(). with toEqual becuase we are comparing to varaibles simple objects not webelements, 
and since we are not using webelements we can use ToContentText()
*/

const date_filled_up= page.locator(".react-date-picker__inputGroup__input");
await page.pause();

const expected_date= [motnh,day, year];
for (let i=0; i< expected_date.length; i++) {
    const value = await date_filled_up.nth(i).inputValue();
     expect(expected_date[i]).toEqual(value);
}
    
})
