import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    
  readonly page: Page;
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly spinnerOverlay: Locator;
  readonly signUpEmailInput: Locator;
  readonly forgotPasswordLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole( 'button' , {name: /Login/i }).first();
    this.emailInput = page.locator('#au-inp-eml').or(page.getByPlaceholder(/Email/i)).first();
    this.passwordInput = page.locator('#au-inp-pwd').or(page.getByPlaceholder(/Password/i)).first();
    this.spinnerOverlay = page.locator('.ngx-spinner-overlay');
    this.signUpEmailInput = page.locator('#au-inp-su-eml').first();
    this.forgotPasswordLink = page.getByText(/forgot.?password/i).first();
  }

   async goto(): Promise<void> {
    const attempts = [
      () => this.page.goto('/authentication', { waitUntil: 'domcontentloaded' as const, timeout: 90000 }),
      () => this.page.reload({ waitUntil: 'domcontentloaded' as const, timeout: 90000 }),
      () => this.page.goto('/authentication', { waitUntil: 'domcontentloaded' as const, timeout: 90000 })
    ];

    for (const attempt of attempts) {
      await attempt();
      await this.waitForSpinnerToClear(20000);

      if (await this.waitForAuthSurface()) {
        return;
      }
    }

    throw new Error(`LoginPage.goto: authentication surface did not render after retries. ${await this.getAuthSurfaceDiagnostics()}`);
  }


  async waitForSpinnerToClear(timeout = 15000): Promise<void> {
    await this.spinnerOverlay.waitFor({ state: 'hidden', timeout }).catch(() => {});
  }

   async waitForAuthSurface(timeout = 30000): Promise<boolean> {
    const loginReady = this.emailInput.waitFor({ state: 'visible', timeout }).then(() => true);
    const signupReady = this.signUpEmailInput.waitFor({ state: 'visible', timeout }).then(() => true);
    const forgotPasswordReady = this.forgotPasswordLink.waitFor({ state: 'visible', timeout }).then(() => true);

    return Promise.any([loginReady, signupReady, forgotPasswordReady]).catch(() => false);
  }

  async openPage(): Promise<void>{
    await this.page.goto("https://botpenguin.com/");
  }

  async assertPageOpened(): Promise<void>{
    await expect(this.page).toHaveTitle("BotPenguin");
  }

  async enterEmail(email : string): Promise<void>{
    await this.emailInput.fill(email);
  }

  async enterPassword(password : string): Promise<void>{
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void>{
    await this.loginButton.click();
    await this.assertLoginPageVisible();
  }


  async assertLoginPageVisible(): Promise<void> {
    await expect(this.emailInput).toBeVisible({ timeout: 30000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 30000 });
  }


    private async getAuthSurfaceDiagnostics(): Promise<string> {
    return this.page.evaluate(() => {
      const bodyText = document.body?.innerText?.replace(/\s+/g, ' ').trim() ?? '';
      return JSON.stringify({
        url: window.location.href,
        readyState: document.readyState,
        bodyText: bodyText.slice(0, 300),
        bodyLength: document.body?.innerText?.length ?? 0
      });
    }).catch(error => `diagnostics unavailable: ${error instanceof Error ? error.message : String(error)}`);
  }

}
