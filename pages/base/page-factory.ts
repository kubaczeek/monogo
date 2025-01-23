import type { Page } from "playwright/test";

import { CartPage } from "../ecom/cart";
import { ProductPage } from "../ecom/product";
import { ShopPage } from "../ecom/shop";
import { HomePage } from "../homepage/home-page";
import { BasePage } from "./base-page";

export class PageFactory {
  private page: Page;
  private instances: { [key: string]: BasePage } = {};

  constructor(page: Page) {
    this.page = page;
  }

  private _getPage<T extends BasePage>(pageClass: new (page: Page) => T): T {
    const className = pageClass.name;

    if (!this.instances[className]) {
      this.instances[className] = new pageClass(this.page);
    }

    return this.instances[className] as T;
  }

  public getPage(): Page {
    return this.page;
  }

  public getBasePage(): BasePage {
    return this._getPage(BasePage);
  }

  public getHomePage(): HomePage {
    return this._getPage(HomePage);
  }

  public getShopPage(): ShopPage {
    return this._getPage(ShopPage);
  }

  public getProductPage(): ProductPage {
    return this._getPage(ProductPage);
  }

  public getCartPage(): CartPage {
    return this._getPage(CartPage);
  }
}
