const { expect } = require('@playwright/test');

class LoginPage{
  constructor(page){
    this.page = page;
    this.usernameInput = page.getByPlaceholder('username');
    this.passwordInput = page.getByPlaceholder('password');

    this.loginButton = page.getByRole('button',{name: 'Login'});

    this.productsHeading = page.getByText('Products', {exact: true});

}
async open(){
  await this.page.goto('/');
}

async login(username, password){
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  await this.loginButton.click();
}

async verifySuccessfulLogin(){
  await expect(this.page).toHaveURL(/inventory\.html/);
  await expect(this.productsHeading).toBeVisible()
}
}

module.exports = { LoginPage };
