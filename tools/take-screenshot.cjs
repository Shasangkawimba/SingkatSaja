const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8000/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');
  
  await page.waitForURL('**/dashboard');
  
  // Set light theme
  await page.evaluate(() => {
     localStorage.setItem('theme', 'light');
     document.documentElement.classList.remove('dark');
  });
  
  // Wait a bit for animations
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'dashboard-light.png' });
  
  await page.goto('http://localhost:8000/links');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'links-light.png' });

  await browser.close();
})();
