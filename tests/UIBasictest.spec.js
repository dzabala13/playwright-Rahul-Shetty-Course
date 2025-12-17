// @ts-check
import { test, expect } from '@playwright/test';

test.only('has title', async ({ page }) => {
  await page.goto('https://google.com');

  // remember that in order to make sure that all the step are run secuentially you need always put the await in each line of your code
  await expect(page).toHaveTitle('Google');
  await new Promise(resolve => setTimeout(resolve, 5000));

});
