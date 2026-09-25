import { test, expect } from '../../src/fixtures/ttacart.fixture';
import { credentials } from '../../src/test-data/credentials';

test('Prevent checkout with an empty cart', async ({ loginPage, inventoryPage }) => {
  test.fail(true, 'TTACart currently leaves the Checkout link enabled when the cart is empty.');
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await inventoryPage.expectLoaded();

  const cartPage = await inventoryPage.openCart();
  await cartPage.expectLoaded();
  await expect(cartPage.cartItems).toHaveCount(0);

  if (await cartPage.checkoutLink.count()) {
    await expect(cartPage.checkoutLink).toBeDisabled();
  }
});
