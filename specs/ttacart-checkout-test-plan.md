# TTACart End-to-End Checkout Test Plan

## Application Overview

End-to-end functional test plan for TTACart covering login, adding the first listed product, cart checkout, customer information, order review, and order completion. Each scenario starts from a fresh browser context and uses credentials from src/.env where authentication is required. Positive scenarios verify the completed order and negative scenarios verify validation, rejection, and prevention of progression.

## Test Scenarios

### 1. TTACart Authentication and Checkout

**Seed:** `src/seed.spec.ts`

#### 1.1. Successful login and first-item checkout completion

**File:** `specs/ttacart-checkout/successful-checkout.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://app.thetestingacademy.com/playwright/ttacart/.
    - expect: The page title is "TTACart - Login".
    - expect: Username and Password fields and a Login button are visible.
  2. Read USERNAME and PASSWORD from src/.env without exposing their values in test output, enter the valid credentials, and click Login.
    - expect: The inventory page opens at /playwright/ttacart/inventory.
    - expect: The page title is "TTACart - Products".
    - expect: The Products heading and product list are visible.
  3. Click Add to cart for the first listed product, "Test.allTheThings() T-Shirt (Red)".
    - expect: The product is added exactly once.
    - expect: The shopping cart indicator shows 1 item.
  4. Open Shopping cart and click Checkout.
    - expect: The cart page shows the selected product with quantity 1 and price $15.99.
    - expect: The checkout information page opens.
  5. Enter First Name "Alex", Last Name "Tester", and Zip/Postal Code "12345", then click Continue.
    - expect: The checkout overview page opens.
    - expect: The order contains the selected first product with quantity 1.
    - expect: The item total is $15.99, tax is $1.28, and total is $17.27.
  6. Click Finish.
    - expect: The checkout completion page opens.
    - expect: The page title is "TTACart - Checkout: Complete!".
    - expect: The page shows "Thank you for your order!".
    - expect: The order-dispatched confirmation text is visible.

#### 1.2. Reject invalid username with valid password

**File:** `specs/ttacart-checkout/invalid-username.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to the TTACart login page.
    - expect: The login form is visible.
  2. Enter an invalid username such as "not_a_real_user" and the valid password from src/.env, then click Login.
    - expect: The user remains on the login page.
    - expect: A visible authentication error is shown.
    - expect: The inventory page is not opened.

#### 1.3. Reject valid username with invalid password

**File:** `specs/ttacart-checkout/invalid-password.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to the TTACart login page.
    - expect: The login form is visible.
  2. Enter the valid username from src/.env and an invalid password such as "wrong_password", then click Login.
    - expect: The user remains on the login page.
    - expect: A visible authentication error is shown.
    - expect: The inventory page is not opened.

#### 1.4. Reject locked-out user

**File:** `specs/ttacart-checkout/locked-out-user.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to the TTACart login page.
    - expect: The login form is visible.
  2. Enter the documented locked_out_user username and the shared password from src/.env, then click Login.
    - expect: Login is prevented.
    - expect: A visible locked-out or authentication error is shown.
    - expect: The inventory page is not opened.

#### 1.5. Require username and password

**File:** `specs/ttacart-checkout/empty-login-fields.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to the TTACart login page.
    - expect: The login form is visible.
  2. Leave Username and Password empty and click Login.
    - expect: A required-field or authentication validation message is shown.
    - expect: The user remains on the login page.
  3. Enter the valid username from src/.env, leave Password empty, and click Login.
    - expect: A password-required or authentication validation message is shown.
    - expect: The inventory page is not opened.
  4. Clear Username, enter the valid password from src/.env, and click Login.
    - expect: A username-required or authentication validation message is shown.
    - expect: The inventory page is not opened.

#### 1.6. Prevent checkout with an empty cart

**File:** `specs/ttacart-checkout/empty-cart-checkout.spec.ts`

**Steps:**
  1. Start from a fresh browser context, log in with credentials from src/.env, and open the inventory page.
    - expect: The products page is visible.
  2. Without adding any product, open Shopping cart.
    - expect: The cart contains no product rows.
    - expect: A checkout action is absent or disabled, or activating it does not permit progression.
  3. Attempt to proceed to checkout if a checkout action is available.
    - expect: The user is prevented from reaching checkout overview without an item.

#### 1.7. Validate required checkout information fields

**File:** `specs/ttacart-checkout/required-customer-information.spec.ts`

**Steps:**
  1. Start from a fresh browser context, log in with credentials from src/.env, add the first listed product, open Shopping cart, and click Checkout.
    - expect: The Checkout: Your Information page is visible.
  2. Leave First Name, Last Name, and Zip/Postal Code empty and click Continue.
    - expect: The user remains on the information page.
    - expect: A validation message identifies a required field.
    - expect: The overview page is not opened.
  3. Enter only First Name "Alex" and click Continue.
    - expect: The user remains on the information page.
    - expect: A validation message identifies Last Name as required.
  4. Enter First Name "Alex" and Last Name "Tester", leave Zip/Postal Code empty, and click Continue.
    - expect: The user remains on the information page.
    - expect: A validation message identifies Zip/Postal Code as required.

#### 1.8. Reject invalid postal-code input

**File:** `specs/ttacart-checkout/invalid-postal-code.spec.ts`

**Steps:**
  1. Start from a fresh browser context, log in with credentials from src/.env, add the first listed product, open Shopping cart, and click Checkout.
    - expect: The Checkout: Your Information page is visible.
  2. Enter First Name "Alex", Last Name "Tester", and an invalid postal code such as "abc", then click Continue.
    - expect: The application rejects the invalid postal code or shows a validation message.
    - expect: The checkout overview is not opened.
  3. Replace the postal code with a valid five-digit value such as "12345" and click Continue.
    - expect: The checkout overview opens successfully.
    - expect: The selected item and calculated total are displayed.
