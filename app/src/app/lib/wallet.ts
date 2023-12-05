import { lastValueFrom } from "rxjs";
import { FinancialAsset } from "./financial_asset";
import { IAsset } from "../interface/financial/iAssets";

export class Wallet {

  static getWalletsInfo(wallets : any[], sharesValues : Map<string, IAsset>) : any[] {
    const walletsInfo : any[] = [];

    wallets.forEach((wallet) => {
      let total : number = 0;
      wallet.assets.forEach((asset : any = {}) => {
        const actualAsset = sharesValues.get(asset.name);
        if (actualAsset !== undefined)
          total += FinancialAsset.getTotalSharesOfAsset(actualAsset.adj_close, asset.amount);
        const walletInfo : any = {
          name : wallet.name,
          total,
          numberOfAssets : wallet.assets.length
        }
        walletsInfo.push(walletInfo)
      });
    });

    return walletsInfo;
  }
}
