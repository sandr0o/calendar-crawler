const { test, expect, chromium } = require('@playwright/test');
const BASE_URL = 'https://broneering.politsei.ee/';

test('Check estonian police guard page functionality', async ({ page }) => {
  await test.step('Check URL', async () => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(`${BASE_URL}`);
    // Click text=EST >> nth=0
    await page.locator('text=EST').first().click();
    // Click text=ENG >> nth=0
    await page.locator('text=ENG').first().click();
    await expect(page).toHaveURL(`${BASE_URL}`);
    await page.locator('a:has-text("Book an appointment")');
    await page.click('a:has-text("Book an appointment")');
    await expect(page).toHaveURL(`${BASE_URL}MakeReservation/SelectService`);
  });

  await test.step('Check services residence permit', async () => {
    await page.waitForSelector(
      'text=4. Applying for a residence permit (and also extension)'
    );
    await page.click(
      'text=4. Applying for a residence permit (and also extension)'
    );
    await page.locator('a:has-text("Continue")').first().click();
  });

  await test.step('Check branches residence permit', async () => {
    await page.waitForSelector(
      'span:has-text("A. H. Tammsaare pst 61, Pärnu")'
    );
    await page.click('span:has-text("A. H. Tammsaare pst 61, Pärnu")');
    await page.locator('a:has-text("Continue")').first().click();
    if (await page.$("div[class=\"day clickable\"]")) {
      let month = await (await page.$("div[class=\"current\"]")).textContent();
      let day = await page.locator("div[class=\"day clickable\"]").first().textContent();
      console.log(month);
      console.log(day);
      await page.locator("div[class=\"day clickable\"]").first().click();
    } else {
      while (!await page.$("div[class=\"day clickable\"]")) {
        await page.locator('a:has-text("next month")').click();
      }
      let month = await (await page.$("div[class=\"current\"]")).textContent();
      let day = await page.locator("div[class=\"day clickable\"]").first().textContent();
      console.log(month);
      console.log(day);
    }
  });
});
