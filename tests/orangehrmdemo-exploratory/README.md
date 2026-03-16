# OrangeHRM Exploratory Test Suite

Comprehensive Playwright automation test suite for the OrangeHRM application covering authentication, dashboard access, employee management, leave management, and security functionalities.

## Test Files Overview

### 1. **auth.spec.js** - Authentication & Session Management
Tests login functionality with various scenarios:
- ✅ AC1.1: Successful login with valid credentials
- ✅ AC1.2: Failed login with invalid username
- ✅ AC1.3: Failed login with invalid password
- ✅ AC1.4: Login with empty username field
- ✅ AC1.5: Login with empty password field
- ✅ AC1.6: Login with both fields empty
- ✅ AC1.7: Login with special characters
- ✅ AC1.8: Login case sensitivity

### 2. **dashboard.spec.js** - Dashboard Access & Navigation
Validates dashboard display and navigation features:
- ✅ AC2.1: Dashboard displays after successful login
- ✅ AC2.1 Extended: All dashboard widgets are visible
- ✅ AC2.2: Left sidebar navigation menu contains all modules
- ✅ AC2.3: User profile dropdown menu functionality

### 3. **employee-management.spec.js** - Employee Management
Tests employee list access and search functionality:
- ✅ AC3.1: Navigate to employee list
- ✅ AC3.2: Access employee list via topbar menu
- ✅ AC3.3: Navigate to add employee form
- ✅ AC3.10: Search employee by name
- ✅ AC3.11: Search employee by ID
- ✅ AC3.12: Search with no results
- ✅ AC3.13: Filter by employee status
- ✅ AC3.14: Reset search filters

### 4. **leave-management.spec.js** - Leave Management
Tests leave list access and filtering:
- ✅ AC6.1: Navigate to leave list
- ✅ AC6.2: Leave list search by date range
- ✅ AC6.3: Leave list filter by status
- ✅ AC6.4: Leave list filter by employee name
- ✅ AC6.5: Leave list with no records

### 5. **logout.spec.js** - Security & Logout
Tests logout functionality and session security:
- ✅ AC8.1: Logout from dashboard
- ✅ AC8.2: Logout from employee management page
- ✅ AC8.3: Logout from leave management page
- ✅ AC8.4: Cannot access protected page after logout
- ✅ AC8.6: Verify credentials display on login page
- ✅ AC8.1 Extended: Session termination verification

### 6. **navigation-ui.spec.js** - Navigation & UI Validation
Tests application navigation and UI element presence:
- ✅ 5.1: Navigation from dashboard to employee list
- ✅ 5.2: Navigation from dashboard to leave management
- ✅ 5.3: Navigation from employee list to add employee
- ✅ 5.4: Breadcrumb navigation
- ✅ 5.5: Form field labels validation
- ✅ 5.6: Search form fields validation
- ✅ 5.7: Button accessibility
- ✅ 5.8: Responsive design check
- ✅ Additional: Sidebar menu functionality and UI elements validation

## Setup & Running Tests

### Prerequisites
- Node.js installed (v14+)
- npm or yarn package manager

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure Playwright browsers are installed:
   ```bash
   npx playwright install
   ```

### Running Tests

#### Run all tests
```bash
npx playwright test
```

#### Run specific test file
```bash
npx playwright test tests/orangehrmdemo-exploratory/auth.spec.js
```

#### Run tests for specific module
```bash
npx playwright test tests/orangehrmdemo-exploratory/ --grep "Employee Management"
```

#### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

#### Run tests with specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

#### Debug mode (opens Playwright Inspector)
```bash
npx playwright test --debug
```

#### View test report
```bash
npx playwright show-report
```

## Application Details

**Application URL:** https://opensource-demo.orangehrmlive.com

**Test Credentials:**
- Username: `Admin`
- Password: `admin123`

## Test Features

### Robust Selectors
- Prioritizes role-based selectors for better accessibility
- Falls back to text-based selectors when necessary
- Handles dynamic elements gracefully

### Best Practices
- ✅ Explicit waits for page navigation (`waitUntil: 'networkidle'`)
- ✅ Proper element visibility checks before interaction
- ✅ Clear, descriptive test names matching test plan
- ✅ Comprehensive error handling
- ✅ Proper setup/teardown with `beforeEach` hooks
- ✅ Meaningful assertions using Playwright's `expect()` syntax
- ✅ Comments for complex test steps
- ✅ Support for multiple browsers (Chromium, Firefox, WebKit)

### Test Timeout Configuration
- Default timeouts: 30 seconds
- Navigation timeouts: 10 seconds
- Element visibility: 5 seconds
- Custom timeouts applied where needed

## Key Test Scenarios

### Authentication Tests
- Happy path login with valid credentials
- Negative tests with invalid inputs
- Validation tests for empty fields
- Special character handling
- Case sensitivity verification

### Dashboard Tests
- Page load verification
- Widget visibility checks
- Navigation menu presence
- User profile functionality

### Employee Management Tests
- Navigation to employee module
- Employee search by name and ID
- Filter functionality by status
- Reset filters functionality
- Handling of no results scenarios

### Leave Management Tests
- Navigate to leave module
- Search by date range
- Filter by status and employee
- Handle empty results

### Security Tests
- Logout from different pages
- Session termination verification
- Protected page access prevention
- Credentials display on login page

### Navigation Tests
- Cross-module navigation
- Breadcrumb navigation
- Button and form accessibility
- Responsive layout verification

## Troubleshooting

### Tests Fail to Run
1. Verify Playwright browsers are installed: `npx playwright install`
2. Check Node.js version: `node --version`
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Application Not Loading
- Verify internet connection
- Check if application URL is accessible
- Verify test credentials are correct

### Flaky Tests
- Tests use explicit waits instead of implicit waits
- Network timeouts are set to 'networkidle' for stability
- Adjust timeout values in individual tests if needed

### Browser Compatibility
- Tests are configured to run on Chromium, Firefox, and WebKit
- Specific browser issues should be noted in test comments

## Test Report
After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Best Practices for Maintenance

1. **Update Selectors:** If UI changes, update selectors focusing on role-based or accessible names
2. **Handle Timeouts:** Increase timeouts for slow environments
3. **Add New Tests:** Follow the same pattern with descriptive names and proper setup
4. **Update Credentials:** If credentials change, update in `beforeEach` hooks

## Directory Structure

```
tests/
├── orangehrmdemo-exploratory/
│   ├── auth.spec.js           # Authentication tests
│   ├── dashboard.spec.js       # Dashboard tests
│   ├── employee-management.spec.js
│   ├── leave-management.spec.js
│   ├── logout.spec.js          # Security & logout tests
│   └── navigation-ui.spec.js   # Navigation & UI tests
└── seed.spec.ts               # Seed file for test setup
```

## Notes

- All tests are independent and can run in parallel
- Tests are designed to work with the existing OrangeHRM demo application
- Password fields are tested for masking but not validated for value due to security
- Some tests use alternative navigation methods if default buttons are not found
- Tests include fallbacks for UI element variations