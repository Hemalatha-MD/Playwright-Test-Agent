import { expect, type Page } from '@playwright/test';
import { CheckoutOverviewPage } from './checkout-overview.page';

export type CustomerInformation = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutInformationPage {
  readonly firstName = this.page.locator('[data-test="firstName"]');
  readonly lastName = this.page.locator('[data-test="lastName"]');
  readonly postalCode = this.page.locator('[data-test="postalCode"]');
  readonly continueButton = this.page.locator('[data-test="continue"]');
  readonly error = this.page.locator('[role="alert"], [data-test="error"]');

  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one$/);
    await expect(this.page).toHaveTitle('TTACart - Checkout: Your Information');
  }

  async fillCustomer(details: Partial<CustomerInformation>): Promise<void> {
    if (details.firstName !== undefined) await this.firstName.fill(details.firstName);
    if (details.lastName !== undefined) await this.lastName.fill(details.lastName);
    if (details.postalCode !== undefined) await this.postalCode.fill(details.postalCode);
  }

  async continue(): Promise<CheckoutOverviewPage> {
    await this.continueButton.click();
    return new CheckoutOverviewPage(this.page);
  }
}
