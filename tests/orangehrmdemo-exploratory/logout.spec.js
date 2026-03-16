// spec: specs/orangehrmdemo-exploratory-test-plan.md
// Test scenarios for security and logout functionality

import { test, expect } from '@playwright/test';

test.describe('Security & Logout', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page and perform login
    await page.goto('https://opensource-demo.orangehrmlive.com', { 
      waitUntil: 'networkidle' 
    });
    
    // Perform login with valid credentials
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');
    
    await usernameInput.fill('Admin');
    await passwordInput.fill('admin123');
    await loginButton.click();
    
    // Wait for dashboard to load
    await expect(page).toHaveURL(/.*\/dashboard\/index/, { timeout: 10000 });
  });

  test('AC8.1 - Logout from Dashboard', async ({ page }) => {
    // 1. Verify user is logged in and dashboard is displayed
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    
    // 2. Click on user profile picture in top-right corner
    const profileImage = page.locator('img[alt*="profile"]');
    await expect(profileImage).toBeVisible();
    
    // Find the clickable profile element
    const profileButton = page.locator('div[role="button"]:has(img[alt*="profile"]), [role="button"]:has(img)').first();
    
    await profileButton.click();
    
    // Wait for dropdown menu to appear
    await page.waitForTimeout(500);
    
    // 3. Click on 'Logout' option from the dropdown menu
    const logoutOption = page.locator('[role="menuitem"], [role="menuitemcheckbox"], a');
    let found = false;
    const count = await logoutOption.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const text = await logoutOption.nth(i).textContent({ timeout: 1000 }).catch(() => '');
      if (text && (text.includes('Logout') || text.includes('Log out') || text.includes('Salir'))) {
        await logoutOption.nth(i).click();
        found = true;
        break;
      }
    }
    
    if (!found) {
      // Fallback: look for logout element more broadly
    
    // 4. Verify page redirect after logout
    await expect(page).toHaveURL(/.*\/auth\/login/, { timeout: 10000 });
    
    // Verify login form is displayed with empty fields
    const loginForm = page.locator('form');
    await expect(loginForm).toBeVisible();
    
    const usernameField = page.locator('input[name="username"]');
    const passwordField = page.locator('input[name="password"]');
    
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
  });

  test('AC8.2 - Logout from Employee Management Page', async ({ page }) => {
    // 1. Navigate to Employee List page
    const pimLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Employee|PIM|Personal Information/i }).first();
    await pimLink.click();
    await expect(page).toHaveURL(/.*\/pim\/viewEmployeeList/, { timeout: 10000 });
    
    // 2. Click on user profile picture
    const profileImage = page.locator('img[alt*="profile"]');
    await expect(profileImage).toBeVisible();
    
    const profileButton = page.locator('div[role="button"]:has(img[alt*="profile"]), [role="button"]:has(img)').first();
    await profileButton.click();
    
    await page.waitForTimeout(500);
    
    // 3. Click 'Logout'
    const logoutOption2 = page.locator('[role="menuitem"], [role="menuitemcheckbox"], a');
    let found2 = false;
    const count2 = await logoutOption2.count();
    for (let i = 0; i < Math.min(count2, 10); i++) {
      const text = await logoutOption2.nth(i).textContent({ timeout: 1000 }).catch(() => '');
      if (text && (text.includes('Logout') || text.includes('Log out') || text.includes('Salir'))) {
        await logoutOption2.nth(i).click();
        found2 = true;
        break;
      }
    }
    
    if (!found2) {
    
    // Verify user is redirected to login page
    await expect(page).toHaveURL(/.*\/auth\/login/, { timeout: 10000 });
    
    // Verify login form is displayed
    const loginForm = page.locator('form');
    await expect(loginForm).toBeVisible();
  });

  test('AC8.3 - Logout from Leave Management Page', async ({ page }) => {
    // 1. Navigate to Leave List/Approvals page
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await leaveLink.click();
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList|.*\/leave\/viewLeaveModule/, { timeout: 10000 });
    
    // 2. Click on user profile and select Logout
    const profileImage = page.locator('img[alt*="profile"]');
    const profileButton = page.locator('div[role="button"]:has(img[alt*="profile"]), [role="button"]:has(img)').first();
    
    await profileButton.click();
    await page.waitForTimeout(500);
    
    const logoutOption = page.locator('text=/Logout|Salir|Log out/i');
    
    if (await logoutOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await logoutOption.click();
    } else {
      const logoutLink = page.getByRole('link', { name: /Logout|Salir/i });
      if (await logoutLink.isVisible({ timeout: 2000 }).catch(() => false)) {
        await logoutLink.click();
      }
    }
    
    // 3. Verify redirect to login page
    await expect(page).toHaveURL(/.*\/auth\/login/, { timeout: 10000 });
    
    // Verify previous session data is no longer accessible
    const loginForm = page.locator('form');
    await expect(loginForm).toBeVisible();
  });

  test('AC8.4 - Cannot Access Protected Page After Logout', async ({ page }) => {
    // 1. Note the dashboard URL
    const dashboardURL = page.url();
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    
    // 2. Perform logout
    const profileButton = page.locator('div[role="button"]:has(img[alt*="profile"]), [role="button"]:has(img)').first();
    await profileButton.click();
    await page.waitForTimeout(500);
    
    const logoutOption = page.locator('text=/Logout|Salir|Log out/i');
    if (await logoutOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await logoutOption.click();
    } else {
      const logoutLink = page.getByRole('link', { name: /Logout|Salir/i });
      if (await logoutLink.isVisible({ timeout: 2000 }).catch(() => false)) {
        await logoutLink.click();
      }
    }
    
    await expect(page).toHaveURL(/.*\/auth\/login/, { timeout: 10000 });
    
    // 3. Attempt to directly navigate to dashboard URL
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    // The application should not allow direct access and should redirect to login
    const currentURL = page.url();
    expect(currentURL).toContain('/auth/login');
    
    // Verify user is redirected back to login page
    const loginForm = page.locator('form');
    await expect(loginForm).toBeVisible();
  });

  test('AC8.6 - Verify Credentials Display on Login Page After Logout', async ({ page }) => {
    // Store current user info before logout
    const userProfileBefore = page.locator('text=Matheus Tester');
    await expect(userProfileBefore).toBeVisible();
    
    // 1. Logout
    const profileButton = page.locator('div[role="button"]:has(img[alt*="profile"]), [role="button"]:has(img)').first();
    await profileButton.click();
    await page.waitForTimeout(500);
    
    const logoutOption = page.locator('text=/Logout|Salir|Log out/i');
    if (await logoutOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await logoutOption.click();
    } else {
      const logoutLink = page.getByRole('link', { name: /Logout|Salir/i });
      if (await logoutLink.isVisible({ timeout: 2000 }).catch(() => false)) {
        await logoutLink.click();
      }
    }
    
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    // 2. Return to login page
    // Verify login form shows empty fields after logout
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    
    await expect(usernameInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
  });

  test('AC8.1 Extended - Session Termination Verification', async ({ page }) => {
    // Verify that session is properly terminated after logout
    // 1. Record dashboard state before logout
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    
    // 2. Logout
    const profileButton = page.locator('div[role="button"]:has(img[alt*="profile"]), [role="button"]:has(img)').first();
    await profileButton.click();
    await page.waitForTimeout(500);
    
    const logoutOption = page.locator('text=/Logout|Salir|Log out/i');
    if (await logoutOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await logoutOption.click();
    }
    
    // 3. Verify redirect
    await expect(page).toHaveURL(/.*\/auth\/login/, { timeout: 10000 });
    
    // 4. Verify session cookies are cleared (by attempting to access dashboard again)
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    // Should redirect to login page
    expect(page.url()).toContain('/auth/login');
  });
});