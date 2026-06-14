const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  
  // Mobile context (iPhone 12 viewport: 390x844, high pixel ratio, touch enabled)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    hasTouch: true,
    isMobile: true,
    deviceScaleFactor: 3
  });
  
  const page = await mobileContext.newPage();
  
  // Set theme to light/dark depending on preference, we will audit light mode as requested since "glass doesn't look clear in light theme"
  page.on('console', msg => {
    console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error('[Browser Page Error]:', err);
  });

  // 1. Welcome Page (Logged out)
  console.log("Capturing welcome page...");
  await page.goto('http://localhost:8000/');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'welcome-mobile.png' });

  // 2. Login Page
  console.log("Capturing login page...");
  await page.goto('http://localhost:8000/login');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'login-mobile.png' });

  // Login
  console.log("Logging in...");
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation()
  ]);

  // Make sure we are in light theme for mobile audit as requested
  await page.evaluate(() => {
     localStorage.setItem('theme', 'light');
     document.documentElement.classList.remove('dark');
  });
  await page.waitForTimeout(1000);

  // 3. Dashboard Page
  console.log("Capturing dashboard page...");
  await page.goto('http://localhost:8000/dashboard');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'dashboard-mobile.png' });

  // 4. Links Index Page
  console.log("Capturing links index page...");
  await page.goto('http://localhost:8000/links');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'links-mobile.png' });

  // 5. Create Link Page
  console.log("Capturing create link page...");
  await page.goto('http://localhost:8000/links/create');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'create-mobile.png' });

  // 6. Edit Link Page (Link ID: 4)
  console.log("Capturing edit link page...");
  await page.goto('http://localhost:8000/links/4/edit');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'edit-mobile.png' });

  // 7. Analytics Page (Link ID: 4)
  console.log("Capturing analytics page...");
  await page.goto('http://localhost:8000/links/4');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'analytics-mobile.png' });

  await browser.close();
  console.log("Screenshots captured successfully.");
})();
