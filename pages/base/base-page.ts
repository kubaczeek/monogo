import { Page } from "playwright";
import { customStep, stepWithParam } from "../../fixtures/all-fixtures";
import { baseURL } from "../../playwright.config";
import { MiniCartComponent } from "../component/ecom/mini-cart";
import { NavbarSection } from "../component/navbar";
import { Base } from "./base";

export class BasePage extends Base {
  public URL: string;
  navbar: NavbarSection;
  miniCart: MiniCartComponent;

  public constructor(page: Page) {
    super(page);
    this.navbar = new NavbarSection(page);
    this.miniCart = new MiniCartComponent(page);
  }

  @stepWithParam
  async goto() {
    await this.page.goto(baseURL() + this.URL);
  }

  @customStep("wait for load DOM content")
  async waitForDomLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }
}
