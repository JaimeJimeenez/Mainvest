import { Injectable } from '@angular/core';
import { NewWalletDataService } from '../requests/wallet/new-wallet-data.service';
import { IAssetWallet, IWallet } from 'src/app/interface/financial/iWallet';
import { AddAssetsDataService } from '../requests/asset/add-assets-data.service';
import { Observable } from 'rxjs';
import { GetWalletsDataService } from '../requests/wallet/get-wallets-data.service';
import { AssetsWalletDataService } from '../requests/asset/assets-wallet-data.service';
import { RemoveWalletDataService } from '../requests/wallet/remove-wallet-data.service';
import { WalletNameDataService } from '../requests/wallet/wallet-name-data.service';
import { EraseAssetDataService } from '../requests/asset/erase-asset-data.service';

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
    private eraseAssetData : EraseAssetDataService,
    private walletNameData : WalletNameDataService
  ) { }

  createWallet(idUser : number, name : string) : Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.newWalletData.createWallet(idUser, name)
        .then((idWallet : number) => resolve(idWallet));
    });
  }

  addAssets(idWallet : number, assets : IAssetWallet[]) : Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.addAssetsData.addAssetsToWallet(idWallet, assets)
        .then((apiResponse : boolean) => resolve(apiResponse));
    })
  }

  getWalletName(idWallet : number) : Observable<any> {
    return this.walletNameData.getWalletName(idWallet);
  }

  getWallets(idUser : number) : Observable<any> {
    return this.getWalletsData.getWallets(idUser);
  }

  getAssetsByWallet(idWallet : number) : Observable<any> {
    return this.assetsWalletData.getAssets(idWallet);
  }

  eraseWallet(idWallet : number) : Observable<boolean> {
    return this.eraseWalletData.removeWallet(idWallet);
  }

  eraseAsset(nameAsset : string, idWallet : number) : Observable<boolean> {
    return this.eraseAssetData.eraseAsset(idWallet, nameAsset);
  }
}
