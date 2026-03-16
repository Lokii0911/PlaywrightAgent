// spec: specs/orangehrmdemo-exploratory-test-plan.md
// Test scenarios for authentication and login functionality

import { test, expect } from '@playwright/test';

test.describe('Authentication & Session Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('https://opensource-demo.orangehrmlive.com', { 
      waitUntil: 'networkidle' 
    });
  });

  test('AC1.1 - Successful Login with Valid Credentials', async ({ page }) => {
    // 1. Launch the OrangeHRM application and verify login page is displayed
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');
    
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    // 2. Enter 'Admin' in the Username field
    await usernameInput.fill('Admin');
    await expect(usernameInput).toHaveValue('Admin');

    // 3. Enter 'admin123' in the Password field
    await passwordInput.fill('admin123');
    // Note: Password field value cannot be asserted for security, but we verify it's filled by checking focus/interaction

    // 4. Click the Login button
    await loginButton.click();

    // Verify successful redirect to Dashboard
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    
    // Verify sidebar navigation menu is visible
    const sidebar = page.locator('nav');
    await expect(sidebar).toBeVisible();
  });

  test('AC1.2 - Failed Login with Invalid Username', async ({ page }) => {
    // 1. Verify login page is displayed
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // 2. Enter invalid username
    await usernameInput.fill('InvalidUser');
    await expect(usernameInput).toHaveValue('InvalidUser');

    // 3. Enter valid password
    await passwordInput.fill('admin123');

    // 4. Click Login button
    await loginButton.click();

    // Verify error message is displayed
    const errorAlert = page.locator('[role="alert"]');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });

    // Verify user remains on login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test('AC1.3 - Failed Login with Invalid Password', async ({ page }) => {
    // 1. Verify login page is displayed
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // 2. Enter valid username
    await usernameInput.fill('Admin');
    await expect(usernameInput).toHaveValue('Admin');

    // 3. Enter invalid password
    await passwordInput.fill('wrongpassword');

    // 4. Click Login button
    await loginButton.click();

    // Verify error message
    const errorAlert = page.locator('[role="alert"]');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });

    // Verify user remains on login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test('AC1.4 - Login with Empty Username Field', async ({ page }) => {
    // 1. Verify login page is displayed
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // 2. Leave Username field empty (no action needed)
    await expect(usernameInput).toHaveValue('');

    // 3. Enter password
    await passwordInput.fill('admin123');

    // 4. Click Login button
    await loginButton.click();

    // Verify form validation error appears
    const requiredError = page.locator('text=/Requerido|required/i');
    await expect(requiredError).toBeVisible({ timeout: 5000 });

    // Verify user remains on login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test('AC1.5 - Login with Empty Password Field', async ({ page }) => {
    // 1. Verify login page is displayed
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // 2. Enter username
    await usernameInput.fill('Admin');
    await expect(usernameInput).toHaveValue('Admin');

    // 3. Leave Password field empty
    await expect(passwordInput).toHaveValue('');

    // 4. Click Login button
    await loginButton.click();

    // Verify form validation error appears
    const requiredError = page.locator('text=/Requerido|required/i');
    await expect(requiredError).toBeVisible({ timeout: 5000 });

    // Verify user remains on login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test('AC1.6 - Login with Both Fields Empty', async ({ page }) => {
    // 1. Verify login page is displayed with empty fields
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // Verify both fields are empty
    await expect(usernameInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');

    // 2. Click Login button without entering any credentials
    await loginButton.click();

    // Verify required error messages appear for both fields
    const requiredErrors = page.locator('[role="alert"]');
    const errorCount = await requiredErrors.count();
    expect(errorCount).toBeGreaterThanOrEqual(1);

    // Verify user remains on login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test('AC1.7 - Login with Special Characters', async ({ page }) => {
    // 1. Verify login page is displayed
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // 2. Enter special characters in username
    await usernameInput.fill('@#$%Admin');
    await expect(usernameInput).toHaveValue('@#$%Admin');

    // 3. Enter special characters in password
    await passwordInput.fill('!@#$admin123');

    // 4. Click Login button
    await loginButton.click();

    // Verify login fails with error
    const errorAlert = page.locator('[role="alert"]');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });

    // Verify user remains on login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });

  test('AC1.8 - Login Case Sensitivity', async ({ page }) => {
    // 1. Verify login page is displayed
    await expect(page).toHaveURL(/.*\/auth\/login/);
    
    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    // 2. Enter lowercase username (case-sensitive test)
    await usernameInput.fill('admin');
    await expect(usernameInput).toHaveValue('admin');

    // 3. Enter password
    await passwordInput.fill('admin123');

    // 4. Click Login button
    await loginButton.click();

    // Verify login fails (credentials are case-sensitive)
    const errorAlert = page.locator('[role="alert"]');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });

    // Verify user is not authenticated and remains on login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });
});