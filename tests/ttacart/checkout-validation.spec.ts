import { test, expect } from '../../src/fixtures/ttacart.fixture';
import { credentials } from '../../src/test-data/credentials';
import type { InventoryPage } from '../../src/pages/inventory.page';
import type { LoginPage } from '../../src/pages/login.page';

async function openCheckout(loginPage: LoginPage, inventoryPage: InventoryPage) {
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await inventoryPage.expectLoaded();
  await inventoryPage.addFirstProduct();
  const cartPage = await inventoryPage.openCart();
  await cartPage.expectLoaded();
  const informationPage = await cartPage.checkout();
  await informationPage.expectLoaded();
  return informationPage;
}

test.describe('TTACart Authentication and Checkout', () => {
  test('Validate required checkout information fields', async ({ page, loginPage, inventoryPage }) => {
    const informationPage = await openCheckout(loginPage, inventoryPage);
    await informationPage.continue();
    await expect(informationPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/checkout-step-one$/);

    await informationPage.fillCustomer({ firstName: 'Alex' });
    await informationPage.continue();
    await expect(informationPage.error).toContainText('Last Name is required');

    await informationPage.fillCustomer({ lastName: 'Tester' });
    await informationPage.continue();
    await expect(informationPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/checkout-step-one$/);
  });

  test('Reject invalid postal-code input', async ({ page, loginPage, inventoryPage }) => {
    test.fail(true, 'TTACart currently accepts non-numeric postal codes and advances to overview.');
    const informationPage = await openCheckout(loginPage, inventoryPage);
    await informationPage.fillCustomer({ firstName: 'Alex', lastName: 'Tester', postalCode: 'abc' });
    await informationPage.continue();
    await expect(informationPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/checkout-step-one$/);
  });
});
