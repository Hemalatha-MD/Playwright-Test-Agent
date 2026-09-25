import { test, expect } from '../../src/fixtures/ttacart.fixture';
import { credentials } from '../../src/test-data/credentials';

const invalidPassword = 'wrong_password';

test.describe('TTACart Authentication and Checkout', () => {
  test('Reject invalid username with valid password', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login('not_a_real_user', credentials.password);
    await expect(loginPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/ttacart\/?$/);
  });

  test('Reject valid username with invalid password', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(credentials.username, invalidPassword);
    await expect(loginPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/ttacart\/?$/);
  });

  test('Reject locked-out user', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', credentials.password);
    await expect(loginPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/ttacart\/?$/);
  });

  test('Require username and password', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(page).toHaveURL(/\/ttacart\/?$/);

    await loginPage.login(credentials.username, '');
    await expect(page).toHaveURL(/\/ttacart\/?$/);

    await loginPage.login('', credentials.password);
    await expect(page).toHaveURL(/\/ttacart\/?$/);
  });
});
