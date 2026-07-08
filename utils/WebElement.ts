import { Page, Locator, expect } from '@playwright/test';

export class WebElement {
  private page: Page;
  private static TIMEOUT = 30000;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Locator Builders ──────────────────────────────

  byId(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  byName(name: string): Locator {
    return this.page.locator(`[name="${name}"]`);
  }

  byClass(className: string): Locator {
    return this.page.locator(`.${className}`);
  }

  byXpath(xpath: string): Locator {
    return this.page.locator(`xpath=${xpath}`);
  }

  byText(text: string): Locator {
    return this.page.getByText(text);
  }

  byPlaceholder(text: string): Locator {
    return this.page.getByPlaceholder(text);
  }

  byRole(role: any, name: string): Locator {
    return this.page.getByRole(role, { name });
  }

  byTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  byLabel(label: string): Locator {
    return this.page.getByLabel(label);
  }

  // ── Navigation ────────────────────────────────────

  async navigate(url: string) {
    console.log(`[ACTION] Navigate → ${url}`);
    await this.page.goto(url);
  }

  async reload() {
    console.log(`[ACTION] Reload page`);
    await this.page.reload();
  }

  async goBack() {
    console.log(`[ACTION] Go back`);
    await this.page.goBack();
  }

  async goForward() {
    console.log(`[ACTION] Go forward`);
    await this.page.goForward();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  // ── Click Actions ─────────────────────────────────

  async click(locator: Locator, timeout = WebElement.TIMEOUT) {
    console.log(`[ACTION] Click → ${locator}`);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }

  async doubleClick(locator: Locator, timeout = WebElement.TIMEOUT) {
    console.log(`[ACTION] Double click → ${locator}`);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.dblclick();
  }

  async rightClick(locator: Locator, timeout = WebElement.TIMEOUT) {
    console.log(`[ACTION] Right click → ${locator}`);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click({ button: 'right' });
  }

  async clickByIndex(locator: Locator, index: number) {
    console.log(`[ACTION] Click index ${index} → ${locator}`);
    await locator.nth(index).click();
  }

  // ── Input Actions ─────────────────────────────────

  async fill(locator: Locator, value: string, timeout = WebElement.TIMEOUT) {
    console.log(`[ACTION] Fill → ${value}`);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }

  async type(locator: Locator, value: string, delay = 100) {
    console.log(`[ACTION] Type → ${value}`);
    await locator.pressSequentially(value, { delay });
  }

  async clear(locator: Locator) {
    console.log(`[ACTION] Clear input`);
    await locator.clear();
  }

  async pressKey(locator: Locator, key: string) {
    console.log(`[ACTION] Press key → ${key}`);
    await locator.press(key);
  }

  async uploadFile(locator: Locator, filePath: string) {
    console.log(`[ACTION] Upload file → ${filePath}`);
    await locator.setInputFiles(filePath);
  }

  // ── Dropdown ──────────────────────────────────────

  async selectByValue(locator: Locator, value: string) {
    console.log(`[ACTION] Select by value → ${value}`);
    await locator.selectOption({ value });
  }

  async selectByLabel(locator: Locator, label: string) {
    console.log(`[ACTION] Select by label → ${label}`);
    await locator.selectOption({ label });
  }

  async selectByIndex(locator: Locator, index: number) {
    console.log(`[ACTION] Select by index → ${index}`);
    await locator.selectOption({ index });
  }

  // ── Checkbox & Radio ──────────────────────────────

  async check(locator: Locator) {
    console.log(`[ACTION] Check checkbox`);
    await locator.check();
  }

  async uncheck(locator: Locator) {
    console.log(`[ACTION] Uncheck checkbox`);
    await locator.uncheck();
  }

  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }

  // ── Mouse Actions ─────────────────────────────────

  async hover(locator: Locator, timeout = WebElement.TIMEOUT) {
    console.log(`[ACTION] Hover → ${locator}`);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.hover();
  }

  async dragAndDrop(source: Locator, target: Locator) {
    console.log(`[ACTION] Drag and drop`);
    await source.dragTo(target);
  }

  async scrollToElement(locator: Locator) {
    console.log(`[ACTION] Scroll to element`);
    await locator.scrollIntoViewIfNeeded();
  }

  async scrollToTop() {
    console.log(`[ACTION] Scroll to top`);
    await this.page.keyboard.press('Control+Home');
  }

  async scrollToBottom() {
    console.log(`[ACTION] Scroll to bottom`);
    await this.page.keyboard.press('Control+End');
  }

  // ── Wait ──────────────────────────────────────────

  async waitForVisible(locator: Locator, timeout = WebElement.TIMEOUT) {
    console.log(`[WAIT] Waiting for element visible`);
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator: Locator, timeout = WebElement.TIMEOUT) {
    console.log(`[WAIT] Waiting for element hidden`);
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForEnabled(locator: Locator, timeout = WebElement.TIMEOUT) {
    console.log(`[WAIT] Waiting for element enabled`);
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeEnabled({ timeout });
  }

  async waitForURL(url: string | RegExp, timeout = WebElement.TIMEOUT) {
    console.log(`[WAIT] Waiting for URL → ${url}`);
    await this.page.waitForURL(url, { timeout });
  }

  async waitForPageLoad() {
    console.log(`[WAIT] Waiting for page load`);
    await this.page.waitForLoadState('networkidle');
  }

  async delay(ms: number) {
    console.log(`[WAIT] Delay ${ms}ms`);
    await this.page.waitForTimeout(ms);
  }

  // ── Get Info ──────────────────────────────────────

  async getText(locator: Locator): Promise<string> {
    const text = await locator.innerText();
    console.log(`[INFO] Get text → ${text}`);
    return text;
  }

  async getValue(locator: Locator): Promise<string> {
    const value = await locator.inputValue();
    console.log(`[INFO] Get value → ${value}`);
    return value;
  }

  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    const value = await locator.getAttribute(attribute);
    console.log(`[INFO] Get attribute ${attribute} → ${value}`);
    return value;
  }

  async getCount(locator: Locator): Promise<number> {
    const count = await locator.count();
    console.log(`[INFO] Element count → ${count}`);
    return count;
  }

  // ── Visibility Check ──────────────────────────────

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  async isDisabled(locator: Locator): Promise<boolean> {
    return await locator.isDisabled();
  }

  // ── Frame ─────────────────────────────────────────

  async switchToFrame(frameLocator: string): Promise<any> {
    console.log(`[ACTION] Switch to frame → ${frameLocator}`);
    return this.page.frameLocator(frameLocator);
  }

  // ── Alert / Dialog ────────────────────────────────

  async acceptAlert() {
    console.log(`[ACTION] Accept alert`);
    this.page.on('dialog', dialog => dialog.accept());
  }

  async dismissAlert() {
    console.log(`[ACTION] Dismiss alert`);
    this.page.on('dialog', dialog => dialog.dismiss());
  }

  async getAlertText(): Promise<string> {
    return new Promise(resolve => {
      this.page.on('dialog', dialog => {
        resolve(dialog.message());
      });
    });
  }

  // ── Screenshot ────────────────────────────────────

  async takeScreenshot(name: string) {
    console.log(`[INFO] Taking screenshot → ${name}`);
    await this.page.screenshot({
      path: `reports/${name}_${Date.now()}.png`,
      fullPage: false
    });
  }

  async takeFullPageScreenshot(name: string) {
    console.log(`[INFO] Taking full page screenshot → ${name}`);
    await this.page.screenshot({
      path: `reports/${name}_${Date.now()}.png`,
      fullPage: true
    });
  }

  // ── New Tab / Window ──────────────────────────────

  async switchToNewTab(action: () => Promise<void>): Promise<Page> {
    console.log(`[ACTION] Switch to new tab`);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      action()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  // ── Cookie & Storage ──────────────────────────────

  async clearCookies() {
    console.log(`[ACTION] Clear cookies`);
    await this.page.context().clearCookies();
  }

  async clearLocalStorage() {
    console.log(`[ACTION] Clear local storage`);
    await this.page.evaluate(() => localStorage.clear());
  }
}