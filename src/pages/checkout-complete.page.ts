import { expect, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly confirmation = this.page.getByRole('heading', { name: 'Thank you for your order!' });

  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete$/);
    await expect(this.page).toHaveTitle('TTACart - Checkout: Complete!');
    await expect(this.confirmation).toBeVisible();
  }
}
