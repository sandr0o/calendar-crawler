const puppeteer = require("puppeteer");
const BASE_URL = "https://broneering.politsei.ee/";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100, // Uncomment to visualize test
  });
  const page = await browser.newPage();

  // Load "https://broneering.politsei.ee/"
  await page.goto("https://broneering.politsei.ee/");

  // Resize window to 1792 x 897
  await page.setViewport({ width: 1792, height: 897 });

  // Click on <a> "EST"
  await page.waitForSelector('.position-fixed [href="#"]');
  await page.click('.position-fixed [href="#"]');

  // Click on <a> "ENG" and await navigation
  await page.waitForSelector(
    '.show > [href="/Localization/SetLanguage?Language=English"]'
  );
  await Promise.all([
    page.click('.show > [href="/Localization/SetLanguage?Language=English"]'),
    page.waitForNavigation(),
  ]);

  // Click on <a> "Book an appointment" and await navigation
  await page.waitForSelector(
    '.d-none > .container [href="/MakeReservation/SelectService"]'
  );
  await Promise.all([
    page.click('.d-none > .container [href="/MakeReservation/SelectService"]'),
    page.waitForNavigation(),
  ]);

  // Scroll wheel by X:0, Y:2
  await page.evaluate(() => window.scrollBy(0, 2));

  // Scroll wheel by X:-104, Y:232
  await page.evaluate(() => window.scrollBy(-104, 232));

  // Scroll wheel by X:8, Y:-26
  await page.evaluate(() => window.scrollBy(8, -26));

  // Scroll wheel by X:-162, Y:220
  await page.evaluate(() => window.scrollBy(-162, 220));

  // Click on <label> "4. Applying for a residen..."
  await page.waitForSelector(".btn:nth-child(4)");
  await page.click(".btn:nth-child(4)");

  // Click on <a> "Continue" and await navigation
  await page.waitForSelector(
    '.d-none > [href="/MakeReservation/SelectLocation?serviceId=H_GGs4WzRUW23mKUtDVIcA"]'
  );
  await Promise.all([
    page.click(
      '.d-none > [href="/MakeReservation/SelectLocation?serviceId=H_GGs4WzRUW23mKUtDVIcA"]'
    ),
    page.waitForNavigation(),
  ]);

  // Click on <span> "A. H. Tammsaare pst 61, P..."
  await page.waitForSelector(".btn:nth-child(3) > .address");
  await page.click(".btn:nth-child(3) > .address");

  // Click on <a> "Continue" and await navigation
  await page.waitForSelector('.d-none > [href="#"]');
  await Promise.all([
    page.click('.d-none > [href="#"]'),
    page.waitForNavigation(),
  ]);

  if (await page.$(".normal .clickable") !== null) {
    let monthSelector = await await page.$(".current");
    let month = await page.evaluate((el) => el.textContent, monthSelector);
    let daySelector = await page.$(".normal .clickable");
    let day = await page.evaluate((el) => el.textContent, daySelector);
    console.log(month);
    console.log(day);
    await page.click(".normal .clickable");
  } else {
    while (!(await page.$(".normal .clickable"))) {
      await page.waitForSelector(
        '[href="/MakeReservation/SelectTime?serviceId=H_GGs4WzRUW23mKUtDVIcA&branchId=3x6HCfe-PkiBc8KOMZLAPQ&selectedMonth=P13c4A#monthSelector"]'
      );
      await Promise.all([
        page.click(
          '[href="/MakeReservation/SelectTime?serviceId=H_GGs4WzRUW23mKUtDVIcA&branchId=3x6HCfe-PkiBc8KOMZLAPQ&selectedMonth=P13c4A#monthSelector"]'
        ),
        page.waitForNavigation(),
      ]);
    }
    let monthSelector = await await page.$(".current");
    let month = await page.evaluate((el) => el.textContent, monthSelector);
    let daySelector = await page.$(".normal .clickable");
    let day = await page.evaluate((el) => el.textContent, daySelector);
    console.log(month);
    console.log(day);
  }

  await browser.close();
})();
