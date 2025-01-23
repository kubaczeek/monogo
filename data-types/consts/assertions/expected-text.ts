import { ExpectedTextEnum } from "../../enums/assertions/expected-text";
import { Region } from "../../enums/region";

export const expectedText = (expectedTextEnum: ExpectedTextEnum) => {
  const expectedTexts = {
    [ExpectedTextEnum.AddToCartMessage]: {
      [Region.PL]: "Dodano do koszyka",
      [Region.UK]: "Product added to cart",
    },
  };

  const sku = expectedTexts[expectedTextEnum][process.env.ENV_REGION as Region];

  if (!sku) {
    throw new Error(
      `Expected text ${expectedTextEnum} for ${process.env.ENV_REGION} not found in the wrapper`
    );
  }

  return sku;
};
