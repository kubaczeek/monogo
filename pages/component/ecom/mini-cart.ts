import { stepWithParam } from "../../../fixtures/all-fixtures";
import { BaseComponent } from "../../base/base-component";

export class MiniCartComponent extends BaseComponent {
  private checkoutButton = this.page.getByTestId("miniCartCheckoutButton");
  public productContainers = this.page.locator(
    '[data-variant="card-variant1"]'
  );
  public productContainer = (index: number) =>
    this.productContainers.nth(index);
  public productPriceNth = (index: number) =>
    this.productContainer(index).locator('[class*="CompactItem-module-price"]');
  public productNameNth = (index: number) =>
    this.productContainer(index).locator(
      '[class*="ProductMiniature-module-name"]'
    );
  public productQuantityNth = (index: number) =>
    this.productContainer(index).locator(this.page.getByTestId("cartQuantity"));
  public cartCounter = this.page.locator('[class*="mini-cart__icon-label"]');

  @stepWithParam
  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}
