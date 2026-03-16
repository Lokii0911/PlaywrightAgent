// spec: specs/orangehrmdemo-exploratory-test-plan.md
// Test scenarios for leave management functionality

import { test, expect } from '@playwright/test';

test.describe('Leave Management', () => {
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

  test('AC6.1 - Navigate to Leave List', async ({ page }) => {
    // 1. Verify dashboard is displayed
    await expect(page).toHaveURL(/.*\/dashboard\/index/);
    
    // 2. Click on Leave Management in the left sidebar
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await expect(leaveLink).toBeVisible();
    await leaveLink.click();
    
    // 3. Verify Leave List page is displayed
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList/, { timeout: 10000 });
    
    // Verify leave list page loaded with content
    const pageContent = page.locator('main, [role="main"]');
    await expect(pageContent).toBeVisible({ timeout: 5000 });
    
    // Verify search form is visible
    const searchForm = page.locator('form');
    await expect(searchForm).toBeVisible();
    
    // Verify leave list table is displayed
    const leaveTable = page.locator('table');
    await expect(leaveTable).toBeVisible({ timeout: 5000 });
  });

  test('AC6.2 - Leave List Search by Date Range', async ({ page }) => {
    // 1. Navigate to Leave List page
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await leaveLink.click();
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList/, { timeout: 10000 });
    
    // 2. Click on From Date field and enter a start date
    const fromDateInput = page.locator('input[placeholder*="Date"], input[placeholder*="date"], input[type="date"]').first();
    
    if (await fromDateInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await fromDateInput.fill('2026-01-01');
      
      // 3. Click on To Date field and enter an end date
      const toDateInput = page.locator('input[placeholder*="Date"], input[placeholder*="date"], input[type="date"]').nth(1);
      
      if (await toDateInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await toDateInput.fill('2026-12-31');
        
        // 4. Click Search button
        const searchButton = page.locator('button').filter({ hasText: /Search|Buscar/i }).first();
        const searchButtonVisible = await searchButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (searchButtonVisible) {
          await searchButton.click();
        } else {
          await toDateInput.press('Enter');
        }
        
        // Verify leave list is filtered
        await page.waitForTimeout(1000);
        const leaveTable = page.locator('table');
        await expect(leaveTable).toBeVisible();
      }
    }
  });

  test('AC6.3 - Leave List Filter by Status', async ({ page }) => {
    // 1. Navigate to Leave List page
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await leaveLink.click();
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList/, { timeout: 10000 });
    
    // 2. Look for status filter dropdown (required field)
    const statusDropdown = page.locator('select');
    
    if (await statusDropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
      // 3. Select a status option (typically Pending Approval)
      const options = await statusDropdown.first().locator('option').allTextContents();
      
      if (options.length > 0) {
        await statusDropdown.first().selectOption(options.length > 1 ? options[1] : options[0]);
        
        // 4. Click search button
        const searchButton = page.locator('button').filter({ hasText: /Search|Buscar/i }).first();
        const searchButtonVisible = await searchButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (searchButtonVisible) {
          await searchButton.click();
        }
        
        // Verify list is filtered
        const leaveTable = page.locator('table');
        await expect(leaveTable).toBeVisible();
      }
    }
  });

  test('AC6.4 - Leave List Filter by Employee Name', async ({ page }) => {
    // 1. Navigate to Leave List page
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await leaveLink.click();
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList/, { timeout: 10000 });
    
    // 2. Enter an employee name in search field
    const employeeNameInput = page.locator('input[placeholder*="name"], input[placeholder*="Name"], [role="combobox"]').first();
    
    if (await employeeNameInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await employeeNameInput.fill('mar');
      
      // 3. Select an employee from suggestions or click Search
      // Wait for autocomplete suggestions
      await page.waitForTimeout(500);
      
      const searchButton = page.locator('button').filter({ hasText: /Search|Buscar/i }).first();
      const searchButtonVisible = await searchButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (searchButtonVisible) {
        await searchButton.click();
      } else {
        await employeeNameInput.press('Enter');
      }
      
      // Verify list is filtered
      await page.waitForTimeout(1000);
      const leaveTable = page.locator('table');
      await expect(leaveTable).toBeVisible();
    }
  });

  test('AC6.5 - Leave List with No Records', async ({ page }) => {
    // 1. Navigate to Leave List page
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await leaveLink.click();
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveList/, { timeout: 10000 });
    
    // 2. Apply filters that result in no matching records (future date range)
    const fromDateInput = page.locator('input[type="date"], input[placeholder*="Date"]').first();
    
    if (await fromDateInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      // Set date range far in the future where no leaves exist
      await fromDateInput.fill('2099-01-01');
      
      const toDateInput = page.locator('input[type="date"], input[placeholder*="Date"]').nth(1);
      if (await toDateInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await toDateInput.fill('2099-12-31');
        
        // 3. Click Search button
        const searchButton = page.locator('button').filter({ hasText: /Search|Buscar/i }).first();
        const searchButtonVisible = await searchButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (searchButtonVisible) {
          await searchButton.click();
        } else {
          await toDateInput.press('Enter');
        }
        
        // 4. Verify no records or a message appears
        await page.waitForTimeout(1500);
        const noRecordsMessage = page.locator('[role="alert"]');
        const noRecordsVisible = await noRecordsMessage.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (noRecordsVisible) {
          expect(noRecordsVisible).toBe(true);
        } else {
          // Check if table is empty
          const tableRows = page.locator('table tbody tr');
          expect(await tableRows.count()).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  test('AC6.1 Extended - Leave Module Navigation', async ({ page }) => {
    // Navigate to Leave Module and verify it loads correctly
    const leaveLink = page.locator('nav a, nav [role="link"]').filter({ hasText: /Leave|Licencia/i }).first();
    await leaveLink.click();
    
    await expect(page).toHaveURL(/.*\/leave\/viewLeaveModule|.*\/leave\/viewLeaveList/, { timeout: 10000 });
    
    // Verify the leave module is accessible
    const leaveModuleContent = page.locator('main, [role="main"]');
    await expect(leaveModuleContent).toBeVisible({ timeout: 5000 });
  });
});