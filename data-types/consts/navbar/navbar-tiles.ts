import { Region } from "../../enums/region";

export const tilePerRegionWrapper = () => {
  const regionTileMap = {
    [Region.PL]: {
      Shop: "1",
      PloomClub: "2",
      Help: "3",
      Blog: "4",
      SpecialOffers: "5",
      RoseShimmerCollection: "6",
    },
    [Region.UK]: {
      Shop: "0",
      AboutPloom: "1",
      PloomClub: "2",
      Blog: "3",
      RefeerFriend: "4",
      FlavourFinder: "5",
    }
  };

  const tiles = regionTileMap[process.env.ENV_REGION as Region];

  if (!tiles) {
    throw new Error(`Region ${process.env.ENV_REGION} not found in the wrapper`);
  }

  return tiles;
};
