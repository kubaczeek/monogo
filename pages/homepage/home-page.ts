import { expect, stepWithParam } from "../../fixtures/all-fixtures";
import { BasePage } from "../base/base-page";

export class HomePage extends BasePage {
  URL = "/";

  public loginButton = this.page.locator('[data-login-label="Login"]');
  private confirmAgeButton = this.page.locator(
    '[class*="ageconfirmation__confirmBtn"]'
  );
  private acceptCookiesButton = this.page.locator(
    "#onetrust-accept-btn-handler"
  );

  @stepWithParam
  async clickConfirmAgeButton() {
    await this.confirmAgeButton.click();
  }

  @stepWithParam
  async assertPageLoadedForNewUser() {
    await expect(this.loginButton).toBeVisible();
  }

  @stepWithParam
  async clickAcceptCookies() {
    await this.acceptCookiesButton.click();
  }
}
