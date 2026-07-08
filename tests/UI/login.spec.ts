import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPages';
import users from '../../data/users.json';

test.describe('Login Feature', () => {

  test('TC001 - Valid login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/dashboard/);
  });

    test('TC002 - Invalid login with wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    
    const alertError = page.locator('.oxd-alert-content-text');
    await expect(alertError).toContainText('Invalid credentials');
    });

    test('TC003 - Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('', '');
    
    const errors = await loginPage.getAllErrors();
    expect(errors).toContain('Required');
    });

});