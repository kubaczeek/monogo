import { defaultTestingSkuPerRegion } from "../../data-types/consts/ecom/sku";
import { expect, test } from "../../fixtures/all-fixtures";
import { ProductPage } from "../../pages/ecom/product";

test.describe("Test Case 3", () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ initTestWithProduct }) => {
    productPage = await initTestWithProduct(defaultTestingSkuPerRegion());
  });

  test("Verify if there are any images on the product page", async ({}) => {
    await expect(productPage.page).toHaveScreenshot("product-page.png", {
      fullPage: true,
    });
  });

  test("Verify if there are any broken links", async ({}) => {
    await productPage.checkDeadLinks();
  });
});
