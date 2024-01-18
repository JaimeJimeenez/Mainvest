import { Injectable } from '@angular/core';
import { NewWalletDataService } from '../requests/wallet/new-wallet-data.service';
import { IAssetWallet, IWallet } from 'src/app/interface/financial/iWallet';
import { AddAssetsDataService } from '../requests/wallet/add-assets-data.service';
import { Observable, lastValueFrom, of } from 'rxjs';
import { GetWalletsDataService } from '../requests/wallet/get-wallets-data.service';
import { AssetsWalletDataService } from '../requests/wallet/assets-wallet-data.service';
import { RemoveWalletDataService } from '../requests/wallet/remove-wallet-data.service';
import { WalletNameDataService } from '../requests/wallet/wallet-name-data.service';
import { SellAssetDataService } from '../requests/wallet/sell-asset-data.service';
import { UpdateAssetDataService } from '../requests/wallet/update-asset-data.service';
import { MoneyService } from '../user/money.service';
import { WalletsByAssetDataService } from '../requests/wallet/wallets-by-asset-data.service';
import { SellAllAssetDataService } from '../requests/wallet/sell-all-asset-data.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private newWalletData : NewWalletDataService,
    private addAssetsData : AddAssetsDataService,
    private getWalletsData : GetWalletsDataService,
    private assetsWalletData : AssetsWalletDataService,
    private eraseWalletData : RemoveWalletDataService,
    private walletNameData : WalletNameDataService,
    private updateAssetData : UpdateAssetDataService,
    private sellAssetData : SellAssetDataService,
    private walletsByAssetData : WalletsByAssetDataService,
    private sellAllData : SellAllAssetDataService,
    private money : MoneyService
  ) { }

  createWallet(idUser : number, name : string) : Observable<number> {
    return this.newWalletData.createWallet(idUser, name);
  }

  addAssets(idWallet : number, assets : IAssetWallet[]) : Observable<boolean> {
    return this.addAssetsData.addAssetsToWallet(idWallet, assets);
  }

  getWalletName(idWallet : number) : Observable<any> {
    return this.walletNameData.getWalletName(idWallet);
  }

  getWallets(idUser : number) : Observable<any> {
    return this.getWalletsData.getWallets(idUser);
  }

  getWalletsByAsset(idUser : number, asset : string) : Observable<any> {
    return this.walletsByAssetData.getWalletsByAsset(idUser, asset);
  }

  getAssetsByWallet(idWallet : number) : Observable<any> {
    return this.assetsWalletData.getAssets(idWallet);
  }

  eraseWallet(idWallet : number) : Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.eraseWalletData.removeWallet(idWallet)
        .then((apiResponse : boolean) => resolve(apiResponse));
    });
  }

  updateAsset(idWallet : number, asset : string, amount : number) : Observable<boolean> {
    return this.updateAssetData.updateAsset(idWallet, asset, amount);
  }

  async buyAsset(idUser : number, tradeInfo : any) : Promise<void> {
    const { isNewWallet, wallet, asset, amount, money } = tradeInfo;
    let idWallet : number = 0;

    if (isNewWallet) {
      idWallet = await lastValueFrom(this.createWallet(idUser, wallet));
      await lastValueFrom(this.addAssets(idWallet, [{ name : asset, amount }]));
    } else {
      console.log(wallet, asset, amount);
      const assetsByWallet = await lastValueFrom(this.getAssetsByWallet(wallet));
      console.log(assetsByWallet);
      const findedAsset = assetsByWallet.findIndex((element : any) => asset === element.name);
      if (findedAsset !== -1)
        await lastValueFrom(this.updateAsset(wallet, asset, +amount));
      else await lastValueFrom(this.addAssets(wallet, [{ name : asset, amount }]));
    }

    await lastValueFrom(this.money.updateMoney(idUser, money));
  }

  sellAsset(tradeInfo : any, money : number, idUser : number) : Observable<boolean> {
    const { wallet, asset, amount, isAllIn } = tradeInfo;
    (async() => {
      await lastValueFrom(this.money.addMoney(money, idUser));
    })();
    return isAllIn ? this.sellAllData.sellAll(wallet, asset) : this.sellAssetData.sellAsset(wallet, asset, amount);
  }
}
