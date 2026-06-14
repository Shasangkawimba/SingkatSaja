const { chromium } = require('playwright');

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => {
    console.log(`BROWSER CONSOLE [${msg.type()}]: ${msg.text()}`);
    if (msg.text().includes('length') || msg.text().includes('TypeError')) {
      console.log('Error location:', msg.location());
    }
  });

  page.on('pageerror', err => {
    console.error('BROWSER PAGE ERROR:', err);
  });

  console.log("Navigating to http://localhost:8000/login ...");
  await page.goto('http://localhost:8000/login');
  
  console.log("Logging in...");
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation()
  ]);

  console.log(`Current URL after login: ${page.url()}`);

  console.log("Navigating to dashboard...");
  await page.goto('http://localhost:8000/dashboard');
  await page.waitForTimeout(2000);

  console.log("Navigating to links...");
  await page.goto('http://localhost:8000/links');
  await page.waitForTimeout(2000);

  await browser.close();
  console.log("Done.");
})();
