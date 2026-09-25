import { test, expect } from '../../src/fixtures/ttacart.fixture';
import { credentials } from '../../src/test-data/credentials';

const firstProduct = 'Test.allTheThings() T-Shirt (Red)';

test.describe('TTACart Authentication and Checkout', () => {
  test('Successful login and first-item checkout completion', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await inventoryPage.expectLoaded();

    await inventoryPage.addFirstProduct();
    const cartPage = await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await expect(cartPage.firstProduct).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(1);

    const informationPage = await cartPage.checkout();
    await informationPage.expectLoaded();
    await informationPage.fillCustomer({ firstName: 'Alex', lastName: 'Tester', postalCode: '12345' });

    const overviewPage = await informationPage.continue();
    await overviewPage.expectLoaded();
    await expect(overviewPage.product).toHaveText(firstProduct);
    await expect(overviewPage.itemTotal).toBeVisible();
    await expect(overviewPage.tax).toBeVisible();
    await expect(overviewPage.total).toBeVisible();

    const completePage = await overviewPage.finish();
    await completePage.expectLoaded();
  });
});
