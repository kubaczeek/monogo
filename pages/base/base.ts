import axios from "axios";
import { Page } from "playwright";
import { customStep, expect } from "../../fixtures/all-fixtures";
import { baseUrlWithoutRegion } from "../../playwright.config";

export abstract class Base {
  page: Page;
  protected hrefs = () => this.page.locator("a[href]");
  protected hrefByText = (text: string) =>
    this.hrefs().filter({ has: this.page.getByText(text, { exact: true }) });

  public constructor(page: Page) {
    this.page = page;
  }

  @customStep("Check deadlink on page")
  async checkDeadLinks() {
    await expect(this.hrefs().nth(1)).toBeAttached();
    const hrefsLocators = await this.hrefs().all();

    for (const hrefLocator of hrefsLocators) {
      const href = await hrefLocator.getAttribute("href");
      if (href?.includes("mailto") || href?.includes("tel")) {
        console.log(`Skipping mailto or tel link: ${href}`);
        continue;
      }
      console.log(`Checking link: ${href}`);
      const calledUrl = href?.includes("http")
        ? href
        : baseUrlWithoutRegion() + href;
      const response = await axios.get(calledUrl);
      expect
        .soft(response.status, `response status code for: ${calledUrl}`)
        .toEqual(200);
      expect
        .soft(response.statusText, `response status code for: ${calledUrl}`)
        .toEqual("OK");
    }
  }
}
