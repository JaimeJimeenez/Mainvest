import { Asset } from "../interfaces/wallet";

export class WalletLib {

  public static calculateTotalCost(assets_data: Map<string, number>, assets: Asset[]): number {
    let total: number = 0;
    assets.forEach((asset: Asset) => {
      const price: number | undefined = assets_data.get(asset.name);
      if (price !== undefined) {
        total += price * asset.amount;
      }
    });

    return total;
  }
}
