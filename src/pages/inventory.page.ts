import { expect, type Page } from '@playwright/test';
import { CartPage } from './cart.page';

export class InventoryPage {
  readonly products = this.page.getByText('Products', { exact: true });
  readonly cartLink = this.page.getByRole('link', { name: 'Shopping cart' });
  readonly productCards = this.page.locator('article');

  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory$/);
    await expect(this.page).toHaveTitle('TTACart - Products');
    await expect(this.products).toBeVisible();
  }

  async addFirstProduct(): Promise<void> {
    await this.productCards.first().getByRole('button', { name: 'Add to cart' }).click();
    await expect(this.cartLink).toContainText('1');
  }

  async openCart(): Promise<CartPage> {
    await this.cartLink.click();
    return new CartPage(this.page);
  }
}
