const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('username');
    this.passwordInput = page.getByPlaceholder('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.productsHeading = page.getByText('Products', { exact: true });
    this.loginError = page.locator('[data-test="error"]');
  }

  async open() {
    await this.page.goto('/');
  }

  async login(username, password) {
    if (!username || !password) {
      throw new Error('SAUCE_USERNAME or SAUCE_PASSWORD is missing.');
    }

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    try {
      await expect(this.page).toHaveURL(/inventory\.html/);
    } catch (error) {
      if (await this.loginError.isVisible()) {
        const message = await this.loginError.textContent();
        throw new Error(`SauceDemo login failed: ${message.trim()}`);
      }

      throw error;
    }

    await expect(this.productsHeading).toBeVisible();
  }
}

module.exports = { LoginPage };
