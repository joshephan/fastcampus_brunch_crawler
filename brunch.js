const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 900,
  });
  await page.goto("https://brunch.co.kr/search");
  await page.click("input.txt_search");
  await page.keyboard.type("Hello World");
  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  let infiniteScrollInterval = setInterval(async () => {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
  }, 1000);

  setTimeout(async () => {
    clearInterval(infiniteScrollInterval);
    console.log("done");
    await browser.close();
  }, 1000 * 10);
})();
