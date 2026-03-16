# OrangeHRM Exploratory Test Plan - SCRUM-201

## Application Overview

This test plan covers comprehensive testing of the OrangeHRM application focusing on HR Administrator workflows. It includes authentication, employee management, leave request management, and logout functionality. The testing covers happy path scenarios, negative scenarios with invalid inputs, edge cases, navigation flows, UI validation, and security aspects. The application is a comprehensive HR management system with modules for employee information, leave management, recruitment, and more.

## Test Scenarios

### 1. Authentication & Session Management

**Seed:** `tests/seed.spec.ts`

#### 1.1. AC1.1 - Successful Login with Valid Credentials

**File:** `tests/authentication-session/successful-login.spec.ts`

**Steps:**
  1. Launch the OrangeHRM application at https://opensource-demo.orangehrmlive.com
    - expect: Login page is displayed with Username and Password input fields highlighted
  2. Enter 'Admin' in the Username field
    - expect: Username 'Admin' is entered in the textbox
  3. Enter 'admin123' in the Password field
    - expect: Password is masked (displayed as dots/asterisks)
  4. Click the Login button
    - expect: User is successfully redirected to the Dashboard
    - expect: Dashboard displays 'Pizarra de pendientes' heading
    - expect: Left sidebar navigation menu is visible with modules list
    - expect: User profile dropdown shows logged-in user information

#### 1.2. AC1.2 - Failed Login with Invalid Username

**File:** `tests/authentication-session/invalid-username-login.spec.ts`

**Steps:**
  1. Navigate to OrangeHRM login page
    - expect: Login page is displayed
  2. Enter 'InvalidUser' in the Username field
    - expect: Username text is entered
  3. Enter 'admin123' in the Password field
    - expect: Password is entered and masked
  4. Click the Login button
    - expect: Login fails
    - expect: Error alert is displayed with message 'Invalid credentials'
    - expect: User remains on the login page
    - expect: Username and Password fields are cleared or still visible for retry

#### 1.3. AC1.3 - Failed Login with Invalid Password

**File:** `tests/authentication-session/invalid-password-login.spec.ts`

**Steps:**
  1. Navigate to OrangeHRM login page
    - expect: Login page is displayed
  2. Enter 'Admin' in the Username field
    - expect: Username 'Admin' is entered
  3. Enter 'wrongpassword' in the Password field
    - expect: Password is entered and masked
  4. Click the Login button
    - expect: Login fails
    - expect: Error alert displays 'Invalid credentials' message
    - expect: User remains on login page
    - expect: Login attempt is rejected

#### 1.4. AC1.4 - Login with Empty Username Field

**File:** `tests/authentication-session/empty-username-validation.spec.ts`

**Steps:**
  1. Navigate to OrangeHRM login page
    - expect: Login page is displayed
  2. Leave Username field empty
    - expect: Username field is empty
  3. Enter 'admin123' in the Password field
    - expect: Password is entered and masked
  4. Click the Login button
    - expect: Form validation is triggered
    - expect: Required error message appears below Username field
    - expect: Login is not submitted
    - expect: User remains on login page

#### 1.5. AC1.5 - Login with Empty Password Field

**File:** `tests/authentication-session/empty-password-validation.spec.ts`

**Steps:**
  1. Navigate to OrangeHRM login page
    - expect: Login page is displayed
  2. Enter 'Admin' in the Username field
    - expect: Username 'Admin' is entered
  3. Leave Password field empty
    - expect: Password field is empty
  4. Click the Login button
    - expect: Form validation is triggered
    - expect: Required error message appears below Password field
    - expect: Login is not submitted
    - expect: User remains on login page

#### 1.6. AC1.6 - Login with Both Fields Empty

**File:** `tests/authentication-session/both-fields-empty-validation.spec.ts`

**Steps:**
  1. Navigate to OrangeHRM login page
    - expect: Login page is displayed with empty fields
  2. Click the Login button without entering any credentials
    - expect: Form validation is triggered
    - expect: Required error messages appear below both Username and Password fields
    - expect: Login is not submitted
    - expect: User remains on login page

#### 1.7. AC1.7 - Login with Special Characters in Username/Password

**File:** `tests/authentication-session/special-characters-login.spec.ts`

**Steps:**
  1. Navigate to OrangeHRM login page
    - expect: Login page is displayed
  2. Enter '@#$%Admin' in the Username field
    - expect: Special characters are entered in the Username field
  3. Enter '!@#$admin123' in the Password field
    - expect: Special characters are entered in the Password field
  4. Click the Login button
    - expect: Login fails with 'Invalid credentials' error
    - expect: User remains on login page

#### 1.8. AC1.8 - Login Case Sensitivity

**File:** `tests/authentication-session/login-case-sensitivity.spec.ts`

**Steps:**
  1. Navigate to OrangeHRM login page
    - expect: Login page is displayed
  2. Enter 'admin' (lowercase) in the Username field
    - expect: Text 'admin' is entered
  3. Enter 'admin123' in the Password field
    - expect: Password is entered
  4. Click the Login button
    - expect: Login fails with 'Invalid credentials' error message
    - expect: Credentials are case-sensitive
    - expect: User is not authenticated

### 2. Dashboard Access & Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. AC2.1 - Dashboard Displays After Successful Login

**File:** `tests/dashboard-navigation/dashboard-access.spec.ts`

**Steps:**
  1. Login with valid credentials (Username: Admin, Password: admin123)
    - expect: User is successfully authenticated
    - expect: Dashboard page loads successfully
  2. Verify dashboard page title and heading
    - expect: Page title is 'OrangeHRM'
    - expect: Main heading shows 'Pizarra de pendientes' (Dashboard)
  3. Verify dashboard widgets are visible
    - expect: Time at Work widget is displayed
    - expect: My Actions section is visible
    - expect: Quick Launch section is visible
    - expect: Buzz Latest Posts section is displayed
    - expect: Employees on Leave Today section is shown
    - expect: Employee Distribution widgets are visible

#### 2.2. AC2.2 - Left Sidebar Navigation Menu Display

**File:** `tests/dashboard-navigation/navigation-menu-display.spec.ts`

**Steps:**
  1. Login and access the dashboard
    - expect: Dashboard is displayed
  2. Verify left sidebar navigation menu contains all required modules
    - expect: Administrador (Administrator) module is visible
    - expect: Módulo de Información Personal (PIM) module is visible
    - expect: Licencias y Permisos (Leave) module is visible
    - expect: Tiempo (Time) module is visible
    - expect: Reclutamiento (Recruitment) module is visible
    - expect: Mi Información (My Info) module is visible
    - expect: Desempeño (Performance) module is visible
    - expect: Directory module is visible
    - expect: Additional modules (Maintenance, Claim, Buzz) are visible

#### 2.3. AC2.3 - User Profile Dropdown Display

**File:** `tests/dashboard-navigation/user-profile-dropdown.spec.ts`

**Steps:**
  1. Login and access the dashboard
    - expect: Dashboard is displayed
  2. Locate user profile picture in top-right corner
    - expect: User profile picture is displayed
    - expect: User name is displayed next to profile picture
  3. Click on user profile picture to open dropdown menu
    - expect: Dropdown menu appears with options
    - expect: About option is visible
    - expect: Support option is visible
    - expect: Change Password option is visible
    - expect: Logout option is visible

### 3. Employee Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. AC3.1 - Navigate to Employee List

**File:** `tests/employee-management/navigate-employee-list.spec.ts`

**Steps:**
  1. Login and access the dashboard
    - expect: Dashboard is displayed
  2. Click on 'Módulo de Información Personal' (PIM) in the left sidebar
    - expect: PIM module page loads
    - expect: Employee List page is displayed
    - expect: Page URL contains '/pim/viewEmployeeList'
  3. Verify page heading and main content
    - expect: Page heading shows 'Información del empleado' (Employee Information)
    - expect: Search form with employee filters is visible
    - expect: Add button is visible
    - expect: Employee list table is displayed

#### 3.2. AC3.2 - Access Employee List via Topbar Menu

**File:** `tests/employee-management/access-employee-list-topbar.spec.ts`

**Steps:**
  1. Navigate to PIM module
    - expect: PIM module page is displayed
  2. Verify topbar menu items
    - expect: Configuración (Settings) option is visible
    - expect: Lista de empleados (Employee List) is highlighted/active
    - expect: Agregar Empleado (Add Employee) option is visible
    - expect: Reportes (Reports) option is visible
  3. Click on 'Lista de empleados' in topbar
    - expect: Employee List page remains displayed or refreshes
    - expect: Employee list table is visible with employee records

#### 3.3. AC4.1 - Navigate to Add Employee Form

**File:** `tests/employee-management/navigate-add-employee.spec.ts`

**Steps:**
  1. Login and navigate to Employee List page
    - expect: Employee List page is displayed
  2. Click the 'Agregar' (Add) button in the employee list
    - expect: Add Employee form page loads
    - expect: Page URL contains '/pim/addEmployee'
    - expect: Form heading shows 'Agregar Empleado' (Add Employee)
  3. Verify form fields are visible
    - expect: Profile picture upload section is visible
    - expect: Employee Full Name input fields (First Name, Middle Name, Last Name) are visible
    - expect: Employee ID field is visible
    - expect: Create Users and Passwords checkbox is visible

#### 3.4. AC4.2 - Add Employee with Required Fields Only

**File:** `tests/employee-management/add-employee-minimal.spec.ts`

**Steps:**
  1. Navigate to Add Employee form
    - expect: Add Employee form is displayed
  2. Enter employee details: First Name='John', Middle Name='James', Last Name='Doe'
    - expect: Employee name fields are populated
  3. Verify Employee ID is auto-populated
    - expect: Employee ID field contains an auto-generated numeric value
  4. Leave profile picture and other optional fields empty
    - expect: Optional fields are empty
  5. Click the 'Guardar' (Save) button
    - expect: Form is submitted
    - expect: Employee is successfully created
    - expect: Confirmation message is displayed or user is redirected to employee list
    - expect: New employee appears in the employee list

#### 3.5. AC4.3 - Add Employee with Profile Picture

**File:** `tests/employee-management/add-employee-with-picture.spec.ts`

**Steps:**
  1. Navigate to Add Employee form
    - expect: Add Employee form is displayed
  2. Click on 'Choose File' button in profile picture section
    - expect: File upload dialog opens
  3. Select a valid image file (jpg, png, or gif up to 1MB)
    - expect: File is selected
    - expect: Preview of the image is displayed if supported
  4. Enter required employee name fields: First Name='Jane', Last Name='Smith'
    - expect: Employee name fields are populated
  5. Click Save button
    - expect: Employee is created with profile picture
    - expect: Profile picture is saved and associated with the employee

#### 3.6. AC4.4 - Add Employee with Create Username/Password

**File:** `tests/employee-management/add-employee-with-user-account.spec.ts`

**Steps:**
  1. Navigate to Add Employee form
    - expect: Add Employee form is displayed
  2. Enter required employee name fields: First Name='Robert', Last Name='Johnson'
    - expect: Employee name fields are filled
  3. Check the 'Crear Usuarios y Contraseñas' (Create Users and Passwords) checkbox
    - expect: Checkbox is checked
    - expect: Additional fields for username and password may appear (if part of form flow)
  4. Click Save button
    - expect: Employee is created
    - expect: User account is created for the employee if form allows it

#### 3.7. AC4.5 - Add Employee with Empty First Name

**File:** `tests/employee-management/add-employee-empty-firstname.spec.ts`

**Steps:**
  1. Navigate to Add Employee form
    - expect: Add Employee form is displayed
  2. Leave First Name field empty
    - expect: First Name field is empty
  3. Enter Last Name='TestEmployee'
    - expect: Last Name is entered
  4. Click Save button
    - expect: Validation error is triggered
    - expect: Required field error message appears for First Name
    - expect: Form is not submitted
    - expect: User remains on Add Employee form

#### 3.8. AC4.6 - Add Employee with Empty Last Name

**File:** `tests/employee-management/add-employee-empty-lastname.spec.ts`

**Steps:**
  1. Navigate to Add Employee form
    - expect: Add Employee form is displayed
  2. Enter First Name='Test'
    - expect: First Name is entered
  3. Leave Last Name field empty
    - expect: Last Name field is empty
  4. Click Save button
    - expect: Validation error is triggered
    - expect: Required field error message appears for Last Name
    - expect: Form is not submitted

#### 3.9. AC4.7 - Add Employee Cancel Button

**File:** `tests/employee-management/add-employee-cancel.spec.ts`

**Steps:**
  1. Navigate to Add Employee form
    - expect: Add Employee form is displayed
  2. Enter employee name: First Name='Cancel', Last Name='Test'
    - expect: Employee name is entered
  3. Click the 'Cancelar' (Cancel) button
    - expect: Form is not submitted
    - expect: User is redirected back to Employee List page
    - expect: Employee is not created

#### 3.10. AC5.1 - Search Employee by Name

**File:** `tests/employee-management/search-employee-by-name.spec.ts`

**Steps:**
  1. Navigate to Employee List page
    - expect: Employee List page is displayed
  2. Click on Employee Name search field and enter a partial employee name (e.g., 'mandaFoneJBL')
    - expect: Employee name is entered in the search field
    - expect: Autocomplete suggestions may appear
  3. Select the employee from suggestions or click the Search button
    - expect: Search is performed
    - expect: Employee list is filtered to show matching employee
    - expect: Only employees with matching names are displayed

#### 3.11. AC5.2 - Search Employee by ID

**File:** `tests/employee-management/search-employee-by-id.spec.ts`

**Steps:**
  1. Navigate to Employee List page
    - expect: Employee List page is displayed
  2. Click on Employee ID search field and enter an employee ID (e.g., '0001')
    - expect: Employee ID is entered in the search field
  3. Click the Search button
    - expect: Search is performed
    - expect: List is filtered to show only employees with matching ID
    - expect: Employee with specified ID is displayed in results

#### 3.12. AC5.3 - Search with No Results

**File:** `tests/employee-management/search-no-results.spec.ts`

**Steps:**
  1. Navigate to Employee List page
    - expect: Employee List page is displayed
  2. Enter a non-existent employee name in the search field (e.g., 'NonExistentEmployee123')
    - expect: Search text is entered
  3. Click the Search button
    - expect: Search is performed
    - expect: No employees match the search criteria
    - expect: Message 'No Records Found' or similar is displayed
    - expect: Employee list table is empty or shows no results

#### 3.13. AC5.4 - Employee Filter by Status

**File:** `tests/employee-management/search-filter-by-status.spec.ts`

**Steps:**
  1. Navigate to Employee List page
    - expect: Employee List page is displayed
  2. Click on the 'Estado del Empleado' (Employee Status) dropdown filter
    - expect: Status dropdown opens
    - expect: Status options are displayed (e.g., Active, Inactive, Contract Ended)
  3. Select a status option (e.g., 'Active')
    - expect: Status is selected
  4. Click Search button
    - expect: Search is filtered by selected status
    - expect: Only employees with selected status are displayed

#### 3.14. AC5.5 - Reset Search Filters

**File:** `tests/employee-management/reset-search-filters.spec.ts`

**Steps:**
  1. Navigate to Employee List page
    - expect: Employee List page is displayed
  2. Enter search criteria (e.g., employee name and status)
    - expect: Search filters are populated
  3. Click the 'Reiniciar' (Reset) button
    - expect: All search filters are cleared
    - expect: Fields return to their default/empty state
    - expect: Employee list shows all employees again

### 4. Leave Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. AC6.1 - Navigate to Leave List

**File:** `tests/leave-management/navigate-leave-list.spec.ts`

**Steps:**
  1. Login and access the dashboard
    - expect: Dashboard is displayed
  2. Click on 'Licencias y Permisos' (Leave Management) in the left sidebar
    - expect: Leave Management module page loads
    - expect: Leave List page is displayed
    - expect: Page URL contains '/leave/viewLeaveList'
  3. Verify page heading and content
    - expect: Page heading shows 'Listado de licencias y permisos' (Leave List)
    - expect: Search form with leave filters is visible
    - expect: Leave list table is displayed

#### 4.2. AC6.2 - Leave List Search by Date Range

**File:** `tests/leave-management/leave-search-by-date.spec.ts`

**Steps:**
  1. Navigate to Leave List page
    - expect: Leave List page is displayed
  2. Click on 'Desde la fecha' (From Date) field and enter a start date (e.g., 2026-01-01)
    - expect: Date is entered in yyyy-dd-mm format (or format accepted by the field)
  3. Click on 'Hasta (Fecha)' (To Date) field and enter an end date (e.g., 2026-12-31)
    - expect: End date is entered
  4. Click Search button
    - expect: Leave list is filtered by date range
    - expect: Only leave requests within the date range are displayed

#### 4.3. AC6.3 - Leave List Filter by Status

**File:** `tests/leave-management/leave-search-by-status.spec.ts`

**Steps:**
  1. Navigate to Leave List page
    - expect: Leave List page is displayed
  2. Click on 'Mostrar Permiso con estado' (Show Leave with Status) dropdown - required field
    - expect: Status dropdown opens
    - expect: Status options are displayed (e.g., Pending Approval)
  3. Select a status (e.g., 'Pendiente de aprobación' - Pending Approval)
    - expect: Status is selected
  4. Click Search button
    - expect: Leave list is filtered by selected status
    - expect: Only leaves with selected status are displayed

#### 4.4. AC6.4 - Leave List Filter by Employee Name

**File:** `tests/leave-management/leave-search-by-employee.spec.ts`

**Steps:**
  1. Navigate to Leave List page
    - expect: Leave List page is displayed
  2. Click on 'Nombre del Empleado' (Employee Name) field and enter an employee name
    - expect: Employee name is entered
    - expect: Autocomplete suggestions may appear
  3. Select an employee from suggestions or click Search
    - expect: Search is performed
    - expect: Leave list is filtered by employee
    - expect: Only leaves for selected employee are displayed

#### 4.5. AC6.5 - Leave List with No Records

**File:** `tests/leave-management/leave-no-records.spec.ts`

**Steps:**
  1. Navigate to Leave List page
    - expect: Leave List page is displayed
  2. Apply filters that result in no matching records (e.g., future date range with no leaves)
    - expect: Search filters are applied
  3. Click Search button
    - expect: 'No Records Found' message is displayed
    - expect: Leave list table is empty

#### 4.6. AC7.1 - Navigate to Leave Approvals

**File:** `tests/leave-management/navigate-leave-approvals.spec.ts`

**Steps:**
  1. Navigate to Leave Management module
    - expect: Leave Management page loads
  2. Locate the 'Autorizaciones' (Approvals) menu item in the topbar
    - expect: Autorizaciones menu is visible
  3. Click on 'Autorizaciones' to open submenu
    - expect: Submenu appears with options: Agregar Autorizaciones, Autorizaciones del Empleado, Mis derechos

#### 4.7. AC7.2 - View Leave Approvals Page

**File:** `tests/leave-management/view-leave-approvals-page.spec.ts`

**Steps:**
  1. Navigate to Leave Management > Autorizaciones del Empleado (Employee Approvals)
    - expect: Leave Approvals page loads
    - expect: Page displays leave approval/entitlements form
  2. Verify approval form contains required search fields
    - expect: Employee Name* field is visible (required)
    - expect: Leave Type field is visible
    - expect: Leave Period dropdown is visible

#### 4.8. AC7.3 - Approve Leave Request (Happy Path)

**File:** `tests/leave-management/approve-leave-request.spec.ts`

**Steps:**
  1. Navigate to Leave Approvals page where pending leave requests are listed
    - expect: Leave approvals page displays list of pending leave requests
  2. Identify a leave request in 'Pending Approval' status
    - expect: Leave request with pending status is visible in the table
  3. Click on the leave request row or approval action button for that request
    - expect: Leave request details are displayed or approval action menu appears
  4. Select 'Approve' option
    - expect: Approval dialog or confirmation message appears
  5. Confirm the approval action
    - expect: Leave request is approved
    - expect: Status changes to 'Approved'
    - expect: Confirmation message is displayed
    - expect: Request is removed from pending list or status updates

#### 4.9. AC7.4 - Reject Leave Request (Happy Path)

**File:** `tests/leave-management/reject-leave-request.spec.ts`

**Steps:**
  1. Navigate to Leave Approvals page
    - expect: Leave approvals page is displayed
  2. Identify a leave request in 'Pending Approval' status
    - expect: Pending leave request is visible
  3. Click on the leave request or rejection action button
    - expect: Leave request details are displayed or action menu appears
  4. Select 'Reject' option
    - expect: Rejection dialog appears, potentially with a comments/reason field
  5. Optionally enter rejection comments
    - expect: Comments field accepts text input
  6. Confirm the rejection
    - expect: Leave request is rejected
    - expect: Status changes to 'Rejected'
    - expect: Confirmation message is displayed

### 5. Navigation & UI Validation

**Seed:** `tests/seed.spec.ts`

#### 5.1. Navigation - From Dashboard to Employee List

**File:** `tests/navigation-ui/navigate-dashboard-to-employees.spec.ts`

**Steps:**
  1. Login and access dashboard
    - expect: Dashboard is displayed
  2. Click on 'Módulo de Información Personal' in left sidebar
    - expect: Navigation to Employee module occurs
    - expect: Employee List page loads
    - expect: Page URL changes to '/pim/viewEmployeeList'

#### 5.2. Navigation - From Dashboard to Leave Management

**File:** `tests/navigation-ui/navigate-dashboard-to-leaves.spec.ts`

**Steps:**
  1. Login and access dashboard
    - expect: Dashboard is displayed
  2. Click on 'Licencias y Permisos' in left sidebar
    - expect: Navigation to Leave module occurs
    - expect: Leave List page loads
    - expect: Page URL changes to '/leave/viewLeaveList'

#### 5.3. Navigation - From Employee List to Add Employee

**File:** `tests/navigation-ui/navigate-employee-list-to-add.spec.ts`

**Steps:**
  1. Navigate to Employee List page
    - expect: Employee List page is displayed
  2. Click 'Agregar Empleado' (Add Employee) from topbar menu
    - expect: Navigation to Add Employee form occurs
    - expect: Form page loads successfully

#### 5.4. Navigation - Breadcrumb Navigation

**File:** `tests/navigation-ui/breadcrumb-navigation.spec.ts`

**Steps:**
  1. Navigate to a nested page like Employee Details or Leave Approval
    - expect: Breadcrumb trail is displayed showing current location
  2. Click on a breadcrumb item to navigate to parent level
    - expect: Navigation to parent page occurs successfully

#### 5.5. UI - Verify Form Field Labels

**File:** `tests/navigation-ui/form-field-labels.spec.ts`

**Steps:**
  1. Navigate to Add Employee form
    - expect: Add Employee form is displayed
  2. Verify all form fields have descriptive labels
    - expect: First Name label is visible
    - expect: Last Name label is visible
    - expect: Employee ID label is visible
    - expect: All required fields are marked with asterisk (*)

#### 5.6. UI - Verify Search Form Fields

**File:** `tests/navigation-ui/search-form-fields.spec.ts`

**Steps:**
  1. Navigate to Employee List page
    - expect: Employee List page is displayed
  2. Verify all search filter fields are visible and labeled
    - expect: Employee Name field is visible
    - expect: Employee ID field is visible
    - expect: Employee Status dropdown is visible
    - expect: Search and Reset buttons are accessible

#### 5.7. UI - Button Accessibility

**File:** `tests/navigation-ui/button-accessibility.spec.ts`

**Steps:**
  1. Navigate through various pages (Dashboard, Employee List, Leave List, Add Employee)
    - expect: All interactive buttons are visible and identifiable
  2. Verify button labels are clear (Add, Save, Cancel, Search, Reset, Login, Logout)
    - expect: Button text is readable and indicates action clearly
  3. Verify buttons change appearance on hover or focus
    - expect: Visual feedback is provided for button interactions

#### 5.8. UI - Responsive Design Check

**File:** `tests/navigation-ui/responsive-design.spec.ts`

**Steps:**
  1. Load various pages of the application
    - expect: Pages load successfully at standard desktop resolution
  2. Verify that navigation menu is accessible
    - expect: Sidebar navigation is visible or accessible
    - expect: Buttons and forms are properly aligned

### 6. Security & Logout

**Seed:** `tests/seed.spec.ts`

#### 6.1. AC8.1 - Logout from Dashboard

**File:** `tests/security-logout/logout-from-dashboard.spec.ts`

**Steps:**
  1. Login with valid credentials and access dashboard
    - expect: User is logged in and dashboard is displayed
  2. Click on user profile picture in top-right corner
    - expect: User profile dropdown menu appears
  3. Click on 'Logout' option from the dropdown menu
    - expect: Logout action is triggered
    - expect: User session is terminated
  4. Verify page redirect after logout
    - expect: User is redirected to login page
    - expect: Page URL shows '/auth/login'
    - expect: Login form is displayed with empty fields

#### 6.2. AC8.2 - Logout from Employee Management Page

**File:** `tests/security-logout/logout-from-employee-page.spec.ts`

**Steps:**
  1. Login and navigate to Employee List page
    - expect: User is on Employee List page
  2. Click on user profile picture
    - expect: User profile dropdown appears
  3. Click 'Logout'
    - expect: Logout is processed
    - expect: User is redirected to login page
  4. Verify login page is displayed
    - expect: Login form is ready for new login attempt
    - expect: Session has been cleared

#### 6.3. AC8.3 - Logout from Leave Management Page

**File:** `tests/security-logout/logout-from-leave-page.spec.ts`

**Steps:**
  1. Login and navigate to Leave List/Approvals page
    - expect: User is on Leave Management page
  2. Click on user profile and select Logout
    - expect: Logout is initiated
  3. Verify redirect to login page
    - expect: User lands on login page
    - expect: Previous session data is no longer accessible

#### 6.4. AC8.4 - Cannot Access Protected Page After Logout

**File:** `tests/security-logout/cannot-access-after-logout.spec.ts`

**Steps:**
  1. Login and note the dashboard URL
    - expect: Dashboard URL is accessible at '/dashboard/index'
  2. Perform logout
    - expect: User is redirected to login page
  3. Attempt to directly navigate to dashboard URL using browser back button or manual URL entry
    - expect: Application does not allow direct access to dashboard
    - expect: User is redirected back to login page
    - expect: Session is protected and requires re-authentication

#### 6.5. AC8.5 - Session Timeout Security (Optional for Observable Behavior)

**File:** `tests/security-logout/session-timeout.spec.ts`

**Steps:**
  1. Login and access a protected page
    - expect: User is logged in successfully
  2. Wait for an extended period without activity (if session timeout is configured)
    - expect: Application may show inactivity warning or auto-logout message
  3. Attempt to perform an action after timeout period
    - expect: If timeout occurred, user is logged out and redirected to login page

#### 6.6. AC8.6 - Verify Password Not Visible After Logout

**File:** `tests/security-logout/password-security-after-logout.spec.ts`

**Steps:**
  1. Login with credentials (Admin/admin123)
    - expect: Dashboard loads successfully
  2. Logout and return to login page
    - expect: User is on login page
  3. Verify login form shows credentials hint (if displayed) without exposing actual password
    - expect: Form displays 'Username: Admin' and 'Password: admin123' as hint text in paragraph
    - expect: Password is not stored in form fields or browser memory

#### 6.7. Multiple Login Sessions - Verify Single Active Session

**File:** `tests/security-logout/multiple-sessions.spec.ts`

**Steps:**
  1. Login in one tab/window to dashboard
    - expect: First session is established
  2. Open a new tab and attempt to login again with same credentials
    - expect: Second login succeeds (application may or may not support multiple concurrent sessions)
  3. Perform logout in the second tab
    - expect: User is logged out from second session
  4. Check first tab/session status
    - expect: First tab may or may not still be logged in depending on session management implementation
