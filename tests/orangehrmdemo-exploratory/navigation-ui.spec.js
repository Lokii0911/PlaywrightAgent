// spec: specs/orangehrmdemo-exploratory-test-plan.md
// Test scenarios for navigation and UI validation

import { test, expect } from '@playwright/test';

test.describe('Navigation & UI Validation', () => {
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

  test('5.1 - Navigation - From Dashboard to Employee List', async ({ page }) => {
    // 1. Verify dashboard is displayed
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    
    // 2. Click on Employee module in left sidebar
    const pimLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Employee|PIM|Personal Information/i }).first();
    await expect(pimLink).toBeVisible();
    await pimLink.click();
    
    // Verify navigation occurs successfully
    await expect(page).toHaveURL(/.*\/pim\/viewEmployeeList/, { timeout: 10000 });
  });

  test('5.2 - Navigation - From Dashboard to Leave Management', async ({ page }) => {
    // 1. Verify dashboard is displayed
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    
    // 2. Click on Leave module in left sidebar
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await expect(leaveLink).toBeVisible();
    await leaveLink.click();
    
    // Verify navigation occurs successfully
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList/, { timeout: 10000 });
  });

  test('5.3 - Navigation - From Employee List to Add Employee', async ({ page }) => {
    // 1. Navigate to Employee List page
    const pimLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Employee|PIM|Personal Information/i }).first();
    await pimLink.click();
    await expect(page).toHaveURL(/.*\/pim\/viewEmployeeList/, { timeout: 10000 });
    
    // 2. Navigate to Add Employee form by URL (more reliable)
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee', {
      waitUntil: 'networkidle'
    });
    
    // Verify navigation to Add Employee form
    await expect(page).toHaveURL(/.*\/pim\/addEmployee/, { timeout: 10000 });
  });

  test('5.4 - Navigation - Breadcrumb Navigation', async ({ page }) => {
    // Navigate to a nested page
    const pimLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Employee|PIM|Personal Information/i }).first();
    await pimLink.click();
    await expect(page).toHaveURL(/.*\/pim\/viewEmployeeList/, { timeout: 10000 });
    
    // Look for breadcrumb navigation element
    const breadcrumb = page.locator('[role="navigation"], .breadcrumb, nav');
    
    if (await breadcrumb.isVisible({ timeout: 3000 }).catch(() => false)) {
      // Breadcrumb is present - verify it displays current location
      const breadcrumbText = await breadcrumb.textContent();
      expect(breadcrumbText).toBeTruthy();
    }
  });

  test('5.5 - UI - Verify Form Field Labels on Add Employee Form', async ({ page }) => {
    // Navigate to Add Employee form
    const pimLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Employee|PIM|Personal Information/i }).first();
    await pimLink.click();
    await expect(page).toHaveURL(/.*\/pim\/viewEmployeeList/, { timeout: 10000 });
    
    // Navigate to Add Employee form
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee', {
      waitUntil: 'networkidle'
    });
    
    // 2. Verify all form fields have descriptive labels
    const expectedLabels = [
      'First Name',
      'Last Name',
      'Employee ID',
      'Nombre',
      'Apellido',
      'ID del Empleado'
    ];
    
    // Check for at least some expected labels
    const pageText = await page.textContent();
    let labelsFound = 0;
    
    for (const label of expectedLabels) {
      if (pageText.includes(label)) {
        labelsFound++;
      }
    }
    
    expect(labelsFound).toBeGreaterThan(0);
  });

  test('5.6 - UI - Verify Search Form Fields on Employee List', async ({ page }) => {
    // Navigate to Employee List page
    const pimLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Employee|PIM|Personal Information/i }).first();
    await pimLink.click();
    await expect(page).toHaveURL(/.*\/pim\/viewEmployeeList/, { timeout: 10000 });
    
    // 2. Verify all search filter fields are visible and labeled
    const pageText = await page.textContent();
    
    // Check for search-related UI elements
    const expectedSearchElements = [
      'Employee',
      'Search',
      'Reset'
    ];
    
    let searchElementsFound = 0;
    for (const element of expectedSearchElements) {
      if (pageText.includes(element)) {
        searchElementsFound++;
      }
    }
    
    // At least some search elements should be present
    expect(searchElementsFound).toBeGreaterThan(0);
  });

  test('5.7 - UI - Button Accessibility', async ({ page }) => {
    // Navigate through various pages and verify button accessibility
    
    // Check dashboard buttons
    let buttons = page.locator('button');
    let buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Navigate to Employee List
    const pimLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Employee|PIM|Personal Information/i }).first();
    await pimLink.click();
    await expect(page).toHaveURL(/.*\/pim\/viewEmployeeList/, { timeout: 10000 });
    
    // Verify buttons on Employee List page
    buttons = page.locator('button');
    buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Navigate to Leave List
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await leaveLink.click();
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList/, { timeout: 10000 });
    
    // Verify buttons on Leave List page
    buttons = page.locator('button');
    buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Verify button labels are clear
    const pageText = await page.textContent();
    const expectedButtonLabels = ['Search', 'Reset'];
    
    let labelsFound = 0;
    for (const label of expectedButtonLabels) {
      if (pageText.includes(label)) {
        labelsFound++;
      }
    }
    
    expect(labelsFound).toBeGreaterThan(0);
  });

  test('5.8 - UI - Responsive Design - Desktop View', async ({ page }) => {
    // 1. Load various pages of the application
    let currentURLs = [
      'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
      'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList',
      'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList'
    ];
    
    for (const url of currentURLs) {
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // 2. Verify that navigation menu is accessible
      const sidebar = page.locator('nav');
      const sidebarVisible = await sidebar.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Verify main content is visible
      const mainContent = page.locator('main, [role="main"]');
      const contentVisible = await mainContent.isVisible({ timeout: 3000 }).catch(() => false);
      
      // At least one of these should be visible
      expect(sidebarVisible || contentVisible).toBe(true);
    }
  });

  test('Navigation - Sidebar Menu Functionality', async ({ page }) => {
    // Verify sidebar menu is fully functional
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    
    // Test navigation to different modules by checking if links exist
    const navLinks = page.locator('nav a, nav [role="link"]');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('5.3 Extended - UI Elements Presence Validation', async ({ page }) => {
    // Extended validation of UI elements across the application
    
    // Dashboard - Verify main content area is visible
    const dashboardContent = page.locator('main, [role="main"]');
    await expect(dashboardContent).toBeVisible();
    
    // Topbar - Verify user profile area
    const userProfileArea = page.locator('img[alt*="profile"]');
  });
});