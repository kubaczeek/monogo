import { defaultTestingSkuPerRegion } from "../../data-types/consts/ecom/sku";
import { expect, test } from "../../fixtures/all-fixtures";
import { CartPage } from "../../pages/ecom/cart";

test.describe("Test Case 2", () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ initTestWithProductInCart }) => {
    cartPage = await initTestWithProductInCart(defaultTestingSkuPerRegion());
  });

  test("Verify if it is possible to remove a product from the cart", async ({}) => {
    await cartPage.clickRemoveProductButton(0);
    await cartPage.clickSubmitRemoveProductButton();
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.productContainers).not.toBeAttached();
    await expect(cartPage.miniCart.cartCounter).toBeHidden();
  });
});
