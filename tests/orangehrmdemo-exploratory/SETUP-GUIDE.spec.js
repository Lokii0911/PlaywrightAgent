/**
 * ORANGEHRM PLAYWRIGHT TEST SUITE - SETUP GUIDE
 * 
 * This document provides complete instructions for setting up and running
 * the generated Playwright test suite for OrangeHRM.
 * 
 * ============================================
 * QUICK START
 * ============================================
 * 
 * 1. Install dependencies:
 *    npm install
 * 
 * 2. Install Playwright browsers:
 *    npx playwright install
 * 
 * 3. Run all tests:
 *    npx playwright test
 * 
 * 4. View results:
 *    npx playwright show-report
 * 
 * ============================================
 * DETAILED SETUP INSTRUCTIONS
 * ============================================
 * 
 * STEP 1: Update package.json Scripts
 * =====================================
 * 
 * Add the following scripts section to your package.json:
 * 
 * "scripts": {
 *   "test": "playwright test",
 *   "test:headed": "playwright test --headed",
 *   "test:debug": "playwright test --debug",
 *   "test:auth": "playwright test tests/orangehrmdemo-exploratory/auth.spec.js",
 *   "test:dashboard": "playwright test tests/orangehrmdemo-exploratory/dashboard.spec.js",
 *   "test:employee": "playwright test tests/orangehrmdemo-exploratory/employee-management.spec.js",
 *   "test:leave": "playwright test tests/orangehrmdemo-exploratory/leave-management.spec.js",
 *   "test:logout": "playwright test tests/orangehrmdemo-exploratory/logout.spec.js",
 *   "test:navigation": "playwright test tests/orangehrmdemo-exploratory/navigation-ui.spec.js",
 *   "test:chromium": "playwright test --project=chromium",
 *   "test:firefox": "playwright test --project=firefox",
 *   "test:webkit": "playwright test --project=webkit",
 *   "test:all-browsers": "playwright test --project=chromium --project=firefox --project=webkit",
 *   "report": "playwright show-report",
 *   "install:browsers": "playwright install"
 * }
 * 
 * STEP 2: Install Dependencies
 * =============================
 * 
 * Run in terminal:
 * npm install
 * 
 * This installs:
 * - @playwright/test (testing framework)
 * - @types/node (TypeScript types)
 * 
 * STEP 3: Install Playwright Browsers
 * ====================================
 * 
 * Run in terminal:
 * npx playwright install
 * 
 * Or use the npm script:
 * npm run install:browsers
 * 
 * This downloads browser binaries for:
 * - Chromium
 * - Firefox
 * - WebKit
 * 
 * ============================================
 * RUNNING TESTS
 * ============================================
 * 
 * RUN ALL TESTS
 * =============
 * npx playwright test
 * 
 * RUN TESTS BY MODULE
 * ===================
 * npm run test:auth              // Authentication tests
 * npm run test:dashboard         // Dashboard tests
 * npm run test:employee          // Employee management tests
 * npm run test:leave             // Leave management tests
 * npm run test:logout            // Security & logout tests
 * npm run test:navigation        // Navigation & UI tests
 * 
 * RUN TESTS BY BROWSER
 * ====================
 * npm run test:chromium          // Chromium only
 * npm run test:firefox           // Firefox only
 * npm run test:webkit            // WebKit only
 * npm run test:all-browsers      // All three browsers
 * 
 * RUN SPECIFIC TEST FILE
 * ======================
 * npx playwright test tests/orangehrmdemo-exploratory/auth.spec.js
 * 
 * RUN SPECIFIC TEST BY NAME
 * ==========================
 * npx playwright test --grep "Successful Login"
 * npx playwright test --grep "Employee"
 * 
 * RUN WITH DIFFERENT OPTIONS
 * ===========================
 * 
 * Headed mode (see browser):
 * npm run test:headed
 * or
 * npx playwright test --headed
 * 
 * Debug mode (Playwright Inspector):
 * npm run test:debug
 * or
 * npx playwright test --debug
 * 
 * Concurrent workers:
 * npx playwright test --workers=1        // Run serially
 * npx playwright test --workers=4        // Run with 4 workers
 * 
 * Verbose output:
 * npx playwright test --reporter=list
 * 
 * ============================================
 * VIEWING TEST RESULTS
 * ============================================
 * 
 * VIEW HTML REPORT
 * ================
 * npm run report
 * or
 * npx playwright show-report
 * 
 * The report opens in your default browser and shows:
 * - Test pass/fail status
 * - Execution time
 * - Screenshots (on failure)
 * - Video recording (if enabled)
 * - Trace files (if enabled)
 * 
 * VIEW REPORT FILE LOCATION
 * =========================
 * Reports are generated in: test-results/
 * HTML report: test-results/index.html
 * 
 * ============================================
 * TEST CONFIGURATION
 * ============================================
 * 
 * PLAYWRIGHT.CONFIG.JS
 * ====================
 * 
 * Current configuration includes:
 * - testDir: ./tests
 * - fullyParallel: true
 * - workers: auto (CI: 1, Local: N)
 * - retries: 0 (Local), 2 (CI)
 * - reporter: html
 * - trace: on-first-retry
 * 
 * Modify playwright.config.js for:
 * - Different base URLs
 * - Custom timeouts
 * - Additional reporters
 * - Environment-specific settings
 * 
 * ============================================
 * TEST FILE ORGANIZATION
 * ============================================
 * 
 * All test files are in: tests/orangehrmdemo-exploratory/
 * 
 * Directory Structure:
 * tests/
 * ├── orangehrmdemo-exploratory/
 * │   ├── auth.spec.js                    // Login tests
 * │   ├── dashboard.spec.js               // Dashboard tests
 * │   ├── employee-management.spec.js     // Employee CRUD
 * │   ├── leave-management.spec.js        // Leave operation
 * │   ├── logout.spec.js                  // Security tests
 * │   ├── navigation-ui.spec.js           // Navigation tests
 * │   └── README.md                       // Module documentation
 * └── seed.spec.ts                        // Seed file
 * 
 * ============================================
 * DEBUGGING TESTS
 * ============================================
 * 
 * USE PLAYWRIGHT INSPECTOR
 * =========================
 * npx playwright test --debug
 * 
 * Features:
 * - Step through tests line by line
 * - Inspect page DOM
 * - Execute commands in console
 * - Take screenshots
 * - View element locators
 * 
 * GENERATE TRACE FILES
 * ====================
 * Modify playwright.config.js:
 * trace: 'on' // Always generate traces
 * 
 * View traces:
 * npx playwright show-trace test-results/trace.zip
 * 
 * TAKE SCREENSHOTS
 * ================
 * In test code:
 * await page.screenshot({ path: 'screenshot.png' });
 * 
 * Generate on failure:
 * npx playwright test --screenshot=on
 * 
 * RECORD VIDEO
 * =============
 * Modify playwright.config.js:
 * use: {
 *   video: 'retain-on-failure' // or 'on'
 * }
 * 
 * ============================================
 * CONTINUOUS INTEGRATION
 * ============================================
 * 
 * GITHUB ACTIONS EXAMPLE
 * ======================
 * 
 * Create .github/workflows/test.yml:
 * 
 * name: Playwright Tests
 * on:
 *   push:
 *     branches: [main, develop]
 *   pull_request:
 *     branches: [main, develop]
 * 
 * jobs:
 *   test:
 *     timeout-minutes: 60
 *     runs-on: ubuntu-latest
 *     steps:
 *     - uses: actions/checkout@v3
 *     - uses: actions/setup-node@v3
 *       with:
 *         node-version: '18'
 *     - run: npm install
 *     - run: npx playwright install --with-deps
 *     - run: npm run test:all-browsers
 *     - uses: actions/upload-artifact@v3
 *       if: always()
 *       with:
 *         name: playwright-report
 *         path: test-results/
 *         retention-days: 30
 * 
 * ============================================
 * ENVIRONMENT SETUP
 * ============================================
 * 
 * SYSTEM REQUIREMENTS
 * ====================
 * - Node.js: v14 or higher
 * - npm: v6 or higher (comes with Node.js)
 * - Disk space: 500MB+ (for Playwright browsers)
 * - Internet: Required for initial setup
 * 
 * VERIFY SETUP
 * ============
 * node --version      // Should show v14+
 * npm --version       // Should show v6+
 * npx --version       // Should show v6.9+
 * 
 * ============================================
 * COMMON ISSUES & SOLUTIONS
 * ============================================
 * 
 * ISSUE: Tests not found
 * SOLUTION: Ensure test files are in ./tests directory
 *           npx playwright test --list // List all tests
 * 
 * ISSUE: Application not loading
 * SOLUTION: Check internet connection
 *           Verify URL: https://opensource-demo.orangehrmlive.com
 *           Check login credentials: Admin / admin123
 * 
 * ISSUE: Tests timeout
 * SOLUTION: Increase timeout in playwright.config.js
 *           timeout: 60000 // 60 seconds
 * 
 * ISSUE: Browser crashes
 * SOLUTION: Update Playwright:
 *           npm install --save-dev @playwright/test@latest
 *           npx playwright install
 * 
 * ISSUE: Tests pass locally but fail in CI
 * SOLUTION: Add --with-deps flag:
 *           npx playwright install --with-deps
 * 
 * ISSUE: Flaky tests (intermittent failures)
 * SOLUTION: Increase timeouts in tests
 *           Use await page.waitForLoadState('networkidle')
 *           Check for race conditions
 * 
 * ============================================
 * BEST PRACTICES
 * ============================================
 * 
 * 1. RUN TESTS FREQUENTLY
 *    - Before committing code
 *    - In CI/CD pipeline
 *    - After UI changes
 * 
 * 2. KEEP TESTS INDEPENDENT
 *    - Don't share state between tests
 *    - Use beforeEach for setup
 *    - Clean up afterEach if needed
 * 
 * 3. USE MEANINGFUL ASSERTIONS
 *    - Test behavior, not implementation
 *    - Include both positive and negative cases
 *    - Validate error messages
 * 
 * 4. MAINTAIN TEST DATA
 *    - Use test credentials from test plan
 *    - Keep test URLs up to date
 *    - Document any test-specific requirements
 * 
 * 5. REVIEW FAILURE REPORTS
 *    - Check screenshots/videos
 *    - Read error messages carefully
 *    - Update tests if UI changes
 * 
 * ============================================
 * UPDATING & MAINTAINING TESTS
 * ============================================
 * 
 * WHEN UI CHANGES
 * ===============
 * 1. Update locators in affected test
 * 2. Test the change manually first
 * 3. Run affected test: npm run test:module
 * 4. Verify all tests pass: npm run test
 * 5. Commit changes: git commit
 * 
 * WHEN ADDING NEW TESTS
 * =====================
 * 1. Create test in appropriate module file
 * 2. Follow naming convention: test('AC#.# - Description')
 * 3. Include setup in beforeEach
 * 4. Add meaningful assertions
 * 5. Run all tests to ensure no conflicts
 * 
 * WHEN TESTS FAIL
 * ================
 * 1. Run with --debug flag to inspect
 * 2. Check screenshot in test-results/
 * 3. Verify application state
 * 4. Check for timing issues
 * 5. Update test or application accordingly
 * 
 * ============================================
 * PERFORMANCE OPTIMIZATION
 * ============================================
 * 
 * PARALLEL EXECUTION
 * ===================
 * By default, tests run in parallel workers
 * Control with:
 * npx playwright test --workers=1    // Serial
 * npx playwright test --workers=4    // 4 workers
 * 
 * FILTER & SKIP TESTS
 * ====================
 * Run specific tests:
 * npx playwright test --grep "Login"
 * 
 * Skip tests:
 * test.skip('Test name', async ({ page }) => {
 *   // This test is skipped
 * });
 * 
 * FOCUS ON ONE TEST
 * ==================
 * test.only('Test name', async ({ page }) => {
 *   // Only this test runs
 * });
 * 
 * Note: CI fails if test.only is in source code
 * 
 * ============================================
 * ADDITIONAL RESOURCES
 * ============================================
 * 
 * Official Documentation:
 * https://playwright.dev/docs/intro
 * 
 * Test Examples:
 * https://github.com/microsoft/playwright/tree/main/examples
 * 
 * Best Practices:
 * https://playwright.dev/docs/best-practices
 * 
 * Debugging:
 * https://playwright.dev/docs/debug
 * 
 * ============================================
 * SUMMARY OF GENERATED TESTS
 * ============================================
 * 
 * Total Test Files: 6
 * Total Tests: 38+
 * Test Categories: 6
 * Application: OrangeHRM Demo
 * URL: https://opensource-demo.orangehrmlive.com
 * Credentials: Admin / admin123
 * 
 * All tests are ready to run immediately.
 * Follow the Quick Start section above to begin.
 * 
 */

// This is a documentation file only - no executable tests
// Run actual tests with: npm run test