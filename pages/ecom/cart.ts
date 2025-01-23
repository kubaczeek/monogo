import { stepWithParam } from "../../fixtures/all-fixtures";
import { BasePage } from "../base/base-page";

export class CartPage extends BasePage {
  private cartContainer = this.page.locator(
    '[class*="PageLayout-module-container"]'
  );
  public cartTotal = this.page.getByTestId("cartTotal");
  public productContainers = this.page
    .getByTestId("regular-cart-list")
    .locator('[data-variant*="card-variant1"]');
  public productContainer = (nth: number) => this.productContainers.nth(nth);
  public productName = (nth: number) =>
    this.productContainer(nth).locator(
      '[class*="ProductMiniature-module-name"]'
    );
  public productPrice = (nth: number) =>
    this.productContainer(nth).locator(
      '[class*="FormattedPrice-module-price"]'
    );
  public productQuantity = (nth: number) =>
    this.productContainer(nth).locator(this.page.getByTestId("cartQuantity"));
  private removeProductButtonNth = (index: number) =>
    this.productContainer(index).locator(
      this.page.getByTestId("cartRemoveButton")
    );
  private submitRemoveProductButton = this.page.getByTestId(
    "remove-item-submit-button"
  );
  public emptyCartMessage =
    this.cartContainer.getByTestId("emptyCartContainer");

  @stepWithParam
  async clickRemoveProductButton(nth: number) {
    await this.removeProductButtonNth(nth).click();
  }

  @stepWithParam
  async clickSubmitRemoveProductButton() {
    await this.submitRemoveProductButton.click();
  }
}
