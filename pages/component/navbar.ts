import { tilePerRegionWrapper } from "../../data-types/consts/navbar/navbar-tiles";
import { NavBarTiles } from "../../data-types/enums/nav-bar-tiles/nav-bar-tiles";
import { stepWithParam } from "../../fixtures/all-fixtures";
import { BaseComponent } from "../base/base-component";

export class NavbarSection extends BaseComponent {
  private navigationItem = (nth: number) =>
    this.page.locator(`li[class*="navigation__item"]`).nth(nth);
  private mobileNavToggle = this.page.locator(
    'button[class="navigation__hamburger"]'
  );

  @stepWithParam async navigateToTile(tile: NavBarTiles, isMobile: boolean) {
    const tilesPerRegion = tilePerRegionWrapper() as unknown as Record<
      string,
      number
    >;
    const tilePerRegion = tilesPerRegion[tile];
    if (!tilePerRegion)
      throw new Error(
        `Tile ${tile} not found in the wrapper for ${process.env.REGION}`
      );
    const request = this.page.waitForResponse((res) => {
      return (
        res
          .request()
          .url()
          .includes("https://api.jtides.com/des-ecommerce/m24-ploom") &&
        res.request().postDataJSON()?.query.includes("query getProducts")
      );
    });

    if (isMobile) await this.triggerMobileToolbar();
    await this.navigationItem(tilePerRegion).click();
    await this.page.mouse.move(0, 0); // move mouse to prevent hover state
    await request;
  }

  @stepWithParam
  async triggerMobileToolbar() {
    await this.mobileNavToggle.click();
  }
}
