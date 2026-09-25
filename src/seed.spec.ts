import { test } from '@playwright/test';
test('should verify the page title', async ({page}) => {
    await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
});