import { expect, type Page } from '@playwright/test';
import { CheckoutCompletePage } from './checkout-complete.page';

export class CheckoutOverviewPage {
  readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  readonly itemTotal = this.page.getByText('Item total: $15.99');
  readonly tax = this.page.getByText('Tax: $1.28');
  readonly total = this.page.getByText('Total: $17.27');
  readonly product = this.page.getByText('Test.allTheThings() T-Shirt (Red)');

  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two$/);
    await expect(this.page).toHaveTitle('TTACart - Checkout: Overview');
  }

  async finish(): Promise<CheckoutCompletePage> {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }
}
