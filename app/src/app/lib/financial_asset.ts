import { ASSETS } from "../const/financial_assets";
import { IAsset } from "../interface/financial/iAssets";
import { IChart } from "../interface/financial/iChart";

export class FinancialAsset {

  constructor() {}

  private static _getAssets(data : any) : string[] {
    let assets : string[] = [];

    for (let i = 0; i < ASSETS.length; i++)
      assets.push(data[i][1])

    return assets;
  }

  static convertFinancialAsset(dataFinancialAssets : any) : Map<string, IAsset[]>{
    const { columns, data, index } = dataFinancialAssets;
    let assetsData = new Map<string, IAsset[]>();
    const assets = this._getAssets(columns);

    assets.forEach((asset : string) => {
      assetsData.set(asset, []);
    });

    data.forEach((values : number[], i : number) => {
      const date = index[i];
      for (let j = 0; j < ASSETS.length; j++) {
        const adj_close = values[j];
        const close = values[j + ASSETS.length * 1];
        const hight = values[j + ASSETS.length * 2];
        const low = values[j + ASSETS.length * 3];
        const open = values[j + ASSETS.length * 4];
        const volume = values[j + ASSETS.length * 5];
        assetsData.get(assets[j])?.push({
          adj_close,
          close,
          hight,
          low,
          open,
          volume,
          date
        });
      }
    });

    return assetsData;
  }

  static getAverageFinancialAssetsData(data : any) : Map<string, IAsset> {
    const dataAssets = this.convertFinancialAsset(data);
    let assetsData = new Map<string, IAsset>;

    dataAssets.forEach((values, asset) => {
      const adj_close = values.reduce((count, value) => count + value.adj_close, 0) / values.length;
      const close = values.reduce((count, value) => count + value.close, 0) / values.length;
      const hight = values.reduce((count, value) => count + value.hight, 0) / values.length;
      const low = values.reduce((count, value) => count + value.low, 0) / values.length;
      const open = values.reduce((count, value) => count + value.open, 0) / values.length;
      const volume = values.reduce((count, value) => count + value.volume, 0) / values.length;
      const date = values[0].date;
      assetsData.set(asset, {
        adj_close,
        close,
        hight,
        low,
        open,
        volume,
        date,
      });
    });

    return assetsData;
  }


  static getFirstSelectAssetOption(assetsOptionsList : string[]) : string {
    for (let asset of ASSETS)
      if (!assetsOptionsList.includes(asset))
        return asset;
    return '';
  }

  static fillOptionsAssets(selectedAssets : string[]) : string[][] {
    const filledOptionsAssets : string[][] = [];

    for (let i = 0; i < selectedAssets.length; i++) {
      const optionsSelect : string[] = ASSETS.filter((asset : string) => !selectedAssets.includes(asset));
      filledOptionsAssets.push(optionsSelect);
    }

    filledOptionsAssets.forEach((optionsAssetsList : string[], index : number) => {
      optionsAssetsList.unshift(selectedAssets[index]);
    });

    return filledOptionsAssets;
  }

  static getTotalSharesOfAsset(valueOfAsset : number, moneyToSpend : number) : number {
    return valueOfAsset * moneyToSpend;
  }

  static getChartData(date : string, dataFinancialAssets : any) : IChart {
    return {
      time : date,
      open : dataFinancialAssets[0],
      high : dataFinancialAssets[1],
      low : dataFinancialAssets[2],
      close : dataFinancialAssets[3]
    }
  }
}
