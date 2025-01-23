import { expectedText } from "../../data-types/consts/assertions/expected-text";
import { defaultTestingSkuPerRegion } from "../../data-types/consts/ecom/sku";
import { ExpectedTextEnum } from "../../data-types/enums/assertions/expected-text";
import { NavBarTiles } from "../../data-types/enums/nav-bar-tiles/nav-bar-tiles";
import { expect, test } from "../../fixtures/all-fixtures";

test.describe("Test Case 1", () => {
  test("Verify if it is possible to add a product to the cart", async ({
    initTest,
    pageFactory,
    isMobile,
  }) => {
    const shopPage = pageFactory.getShopPage();
    const productPage = pageFactory.getProductPage();
    const cartPage = pageFactory.getCartPage();
    const homepage = initTest;
    await homepage.assertPageLoadedForNewUser();
    await homepage.navbar.navigateToTile(NavBarTiles.Shop, isMobile);

    const { productPrice } = await shopPage.openProductBySku(
      defaultTestingSkuPerRegion()
    );
    await expect.soft(productPage.productPrice).toHaveText(productPrice);

    await productPage.clickAddToCart();
    await productPage.assertToastMessage(
      expectedText(ExpectedTextEnum.AddToCartMessage)
    );
    await expect(productPage.miniCart.cartCounter).toHaveText("1");
    await expect(productPage.miniCart.productQuantityNth(0)).toHaveValue("1");

    await productPage.clickMiniCartButton();
    await expect(productPage.miniCart.productContainers).toHaveCount(1);
    await expect(productPage.miniCart.productPriceNth(0)).toHaveText(
      productPrice
    );

    await productPage.clickMiniCartButton();
    await productPage.miniCart.clickCheckoutButton();
    await expect(cartPage.productContainers).toHaveCount(1);
    await expect(cartPage.productPrice(0)).toHaveText(productPrice);
    await expect(cartPage.productQuantity(0)).toHaveValue("1");
    await expect(cartPage.cartTotal).toHaveText(productPrice);
  });
});
