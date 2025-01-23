import { expect, mergeTests } from "playwright/test";
import { expectedText } from "../data-types/consts/assertions/expected-text";
import { ExpectedTextEnum } from "../data-types/enums/assertions/expected-text";
import { NavBarTiles } from "../data-types/enums/nav-bar-tiles/nav-bar-tiles";
import { PageFactory } from "../pages/base/page-factory";
import { CartPage } from "../pages/ecom/cart";
import { ProductPage } from "../pages/ecom/product";
import { HomePage } from "../pages/homepage/home-page";
import { test as data } from "./data-fixtures";

export const baseTest = mergeTests(data);

export { expect } from "playwright/test";

export interface State {
  pageFactory: PageFactory;
  initTest: HomePage;
  initTestWithProduct: (skuId: string) => Promise<ProductPage>;
  initTestWithProductInCart: (skuId: string) => Promise<CartPage>;
}

export const test = baseTest.extend<State>({
  pageFactory: async ({ page }, use) => {
    const pageFactory = new PageFactory(page);

    await use(pageFactory);
  },

  initTest: async ({ pageFactory }, use) => {
    const homePage = pageFactory.getHomePage();
    await homePage.goto();
    await homePage.clickAcceptCookies();
    await homePage.clickConfirmAgeButton();
    await use(pageFactory.getHomePage());
  },

  initTestWithProduct: async ({ pageFactory, initTest, isMobile }, use) => {
    async function initTestWithProductInCart(skuId: string) {
      const homepage = initTest;
      const shopPage = pageFactory.getShopPage();
      const productPage = pageFactory.getProductPage();

      await homepage.assertPageLoadedForNewUser();
      await homepage.navbar.navigateToTile(NavBarTiles.Shop, isMobile);

      await shopPage.openProductBySku(skuId);
      await expect(productPage.addToCartButton).toBeEnabled();
      return pageFactory.getProductPage();
    }
    await use(initTestWithProductInCart);
  },

  initTestWithProductInCart: async (
    { pageFactory, initTestWithProduct },
    use
  ) => {
    async function initTestWithProductInCart(skuId: string) {
      const productPage = await initTestWithProduct(skuId);
      await productPage.clickAddToCart();
      await productPage.assertToastMessage(
        expectedText(ExpectedTextEnum.AddToCartMessage)
      );
      await productPage.miniCart.clickCheckoutButton();
      return pageFactory.getCartPage();
    }
    await use(initTestWithProductInCart);
  },
});
