import { expect, stepWithParam } from "../../fixtures/all-fixtures";
import { BasePage } from "../base/base-page";

export class ProductPage extends BasePage {
  private miniCartButton = this.page.getByTestId("miniCart");
  public productNameHeader = this.page.locator("h1[class]");
  public productPrice = this.page.getByTestId("finalPrice");
  private toastMessage = (hasText: string) =>
    this.page.locator('[class*="Toaster-module-success"]', { hasText }).first();
  public addToCartButton = this.page.getByTestId("pdpAddToProduct");

  @stepWithParam
  async assertToastMessage(text: string) {
    const toastMessage = this.toastMessage(text);
    await expect(toastMessage).toBeVisible({ timeout: 10000 });
    await toastMessage.waitFor({ state: "hidden" });
  }

  @stepWithParam
  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  @stepWithParam
  async clickMiniCartButton() {
    await this.miniCartButton.click();
  }
}
