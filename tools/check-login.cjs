const { chromium } = require('playwright');

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`);
    if (msg.text().includes('length') || msg.text().includes('TypeError')) {
      console.log('Error details:', msg.location());
    }
  });

  page.on('pageerror', err => {
    console.error('BROWSER PAGE ERROR:', err);
  });

  console.log("Navigating to http://localhost:8000/login ...");
  try {
    await page.goto('http://localhost:8000/login', { timeout: 10000 });
    console.log("Page loaded. Waiting 3 seconds...");
    await page.waitForTimeout(3000);
  } catch (e) {
    console.error("Navigation failed:", e);
  }

  await browser.close();
  console.log("Done.");
})();
