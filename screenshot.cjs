const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  
  // Desktop
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const dPage = await desktopContext.newPage();
  
  await dPage.goto('http://localhost:8000/login');
  await dPage.fill('input[type="email"]', 'test@example.com');
  await dPage.fill('input[type="password"]', 'password');
  await dPage.click('button[type="submit"]');
  await dPage.waitForURL('**/dashboard');
  
  await dPage.screenshot({ path: 'dashboard-desktop.png', fullPage: true });
  
  await dPage.goto('http://localhost:8000/links');
  await dPage.waitForTimeout(1000);
  await dPage.screenshot({ path: 'links-desktop.png', fullPage: true });

  await dPage.goto('http://localhost:8000/');
  await dPage.waitForTimeout(1000);
  await dPage.screenshot({ path: 'welcome-desktop.png', fullPage: true });
  
  // Mobile
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true });
  const mPage = await mobileContext.newPage();
  
  await mPage.goto('http://localhost:8000/login');
  await mPage.fill('input[type="email"]', 'test@example.com');
  await mPage.fill('input[type="password"]', 'password');
  await mPage.click('button[type="submit"]');
  await mPage.waitForURL('**/dashboard');
  
  await mPage.screenshot({ path: 'dashboard-mobile.png', fullPage: true });
  
  await mPage.goto('http://localhost:8000/links');
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: 'links-mobile.png', fullPage: true });

  await mPage.goto('http://localhost:8000/');
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: 'welcome-mobile.png', fullPage: true });

  await browser.close();
})();
