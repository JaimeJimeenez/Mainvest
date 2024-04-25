import { Asset, AssetData } from "../interfaces/market";

export abstract class Market {

  private static _getVariation(priceActual: number, priceBefore: number): number {
    return 100 - priceBefore * 100 / priceActual;
  }

  public static getAssetsData(actual: Map<string, Asset[]>, before: Map<string, Asset[]>, assets: string[]): AssetData[] {
    const assetsData: AssetData[] = [];
    assets.forEach((asset: string) => {
      const dataActual: Asset[] | undefined = actual.get(asset);
      const dataBefore: Asset[] | undefined = before.get(asset);
      if (dataActual != undefined && dataBefore !== undefined) {
        const priceActual = dataActual.reduce((count, asset) => count + asset.adj_close, 0) / dataActual.length;
        const priceBefore = dataBefore.reduce((count, asset) => count + asset.adj_close, 0) / dataBefore.length;
        assetsData.push({
          name: asset,
          price: dataActual[0].adj_close,
          variation: this._getVariation(priceActual, priceBefore),
          volume: dataActual[0].volume
        });
      }
    });
    return assetsData;
  }
}