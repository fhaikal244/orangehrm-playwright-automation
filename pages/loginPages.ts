import { Page, Locator } from '@playwright/test';
import { WebElement } from '../utils/WebElement';

export class LoginPage {
  private web: WebElement;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator; 

  constructor(page: Page) {
    this.web = new WebElement(page);
    this.usernameInput = this.web.byName('username');
    this.passwordInput = this.web.byName('password');
    this.loginButton   = this.web.byRole('button', 'Login');
    this.errorMessage  = this.web.byClass('oxd-input-group__message');
  }

  async navigate() {
    await this.web.navigate('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.web.fill(this.usernameInput, username);
    await this.web.fill(this.passwordInput, password);
    await this.web.click(this.loginButton);
  }

  async takeScreenshot(name: string) {
    await this.web.takeScreenshot(name);
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async getUsernameError(): Promise<string> {
   return await this.errorMessage.first().innerText();
 }

  async getPasswordError(): Promise<string> {
return await this.errorMessage.nth(1).innerText();
 }

  async getAllErrors(): Promise<string[]> {
   return await this.errorMessage.allInnerTexts();
 }
}