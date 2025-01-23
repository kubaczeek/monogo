import { Region } from "../../enums/region";

export const defaultTestingSkuPerRegion = () => {
  const regionSkuMap = {
    [Region.PL]: "15109183",
    [Region.UK]: "ploom-x-advanced",
  };

  const sku = regionSkuMap[process.env.ENV_REGION as Region];

  if (!sku) {
    throw new Error(
      `Region ${process.env.ENV_REGION} not found in the wrapper`
    );
  }

  return sku;
};
