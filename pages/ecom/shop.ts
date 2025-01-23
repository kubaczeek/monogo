import { stepWithParam } from "../../fixtures/all-fixtures";
import { BasePage } from "../base/base-page";

export class ShopPage extends BasePage {
  private productBySku = (sku: string) =>
    this.page.locator(`[data-sku="${sku}"]`);
  private productPrice = (sku: string) =>
    this.productBySku(sku).locator(
      `[class="aem-productTeaserComponent__price"]`
    );
  private productName = (sku: string) =>
    this.productBySku(sku).locator(
      `header [class="aem-productTeaserComponent__title"]`
    );

  @stepWithParam
  async openProductBySku(sku: string): Promise<{
    productName: string;
    productPrice: string;
  }> {
    await this.waitForDomLoad();
    const productPriceLocator = this.productPrice(sku);
    const productNameLocator = this.productName(sku);

    await productNameLocator.waitFor({ state: "visible" });
    await productPriceLocator.waitFor({ state: "visible" });

    const productName = (await productNameLocator.textContent()) as string;
    const productPrice = (await productPriceLocator.textContent()) as string;

    await this.productBySku(sku).click();

    return {
      productName: productName.trim(),
      productPrice: productPrice.trim(),
    };
  }
}
