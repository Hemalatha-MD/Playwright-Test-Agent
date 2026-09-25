import { expect, type Page } from '@playwright/test';
import { CheckoutInformationPage } from './checkout-information.page';

export class CartPage {
  readonly cartItems = this.page
    .locator('main')
    .getByRole('link', { name: 'Test.allTheThings() T-Shirt (Red)', exact: true });
  readonly checkoutLink = this.page.getByRole('link', { name: 'Checkout' });
  readonly firstProduct = this.page.getByRole('link', { name: 'Test.allTheThings() T-Shirt (Red)' });

  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart$/);
    await expect(this.page).toHaveTitle('TTACart - Your Cart');
  }

  async checkout(): Promise<CheckoutInformationPage> {
    await this.checkoutLink.click();
    return new CheckoutInformationPage(this.page);
  }
}
