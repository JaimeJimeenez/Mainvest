import { Injectable } from '@angular/core';
import { NewWalletDataService } from '../requests/wallet/new-wallet-data.service';
import { IAssetWallet, IWallet } from 'src/app/interface/financial/iWallet';
import { AddAssetsDataService } from '../requests/wallet/add-assets-data.service';
import { Observable } from 'rxjs';
import { GetWalletsDataService } from '../requests/wallet/get-wallets-data.service';
import { AssetsWalletDataService } from '../requests/wallet/assets-wallet-data.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private newWalletData : NewWalletDataService,
    private addAssetsData : AddAssetsDataService,
    private getWalletsData : GetWalletsDataService,
    private assetsWalletData : AssetsWalletDataService,
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

  getWallets(idUser : number) : Observable<any> {
    return this.getWalletsData.getWallets(idUser);
  }

  getAssetsByWallet(idWallet : number) : Observable<any> {
    return this.assetsWalletData.getAssets(idWallet);
  }
}
