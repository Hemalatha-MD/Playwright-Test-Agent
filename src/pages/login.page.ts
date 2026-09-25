import { expect, type Page } from '@playwright/test';

export class LoginPage {
  readonly username = this.page.locator('[data-test="username"]');
  readonly password = this.page.locator('[data-test="password"]');
  readonly loginButton = this.page.locator('[data-test="login-button"]');
  readonly error = this.page.locator('[role="alert"], [data-test="error"]');

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('./');
    await expect(this.page).toHaveTitle('TTACart - Login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
