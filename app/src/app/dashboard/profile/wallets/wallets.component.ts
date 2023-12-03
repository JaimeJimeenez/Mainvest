import { Component } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ASSETS } from 'src/app/const/financial_assets';
import { IAsset } from 'src/app/interface/financial/iAssets';

import { IAssetWallet, IWallet } from 'src/app/interface/financial/iWallet';
import { FinancialAsset } from 'src/app/lib/financial_asset';
import { DateService } from 'src/app/service/common/date.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';
import { MoneyService } from 'src/app/service/user/money.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'mainvest-profile-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent {
  private _idUser : number = 0;
  private _sharesValues : Map<string, IAsset> = new Map<string, IAsset>();
  private _eraseWalletIndex : number = -1;

  public wallets : IWallet[] = [];
  public walletsInfo : Array<{ name : string; total : number; numberOfAssets : number}> = [];
  public benefitsWallets : number[] = [];

  constructor(
    private wallet : WalletService,
    private date : DateService,
    private money : MoneyService,
    private financialAssetsData : FinancialAssetsDataService,
  ) {

    this._getIdUser();
    this._getWalletsByUser();
  }

  private async _getWalletsByUser() : Promise<void> {
    await this._getFinancialAssets();
    const wallets = await lastValueFrom(this.wallet.getWallets(this._idUser));
    for (let wallet of wallets) {
      const assetsByWallet : any[] = await lastValueFrom(this.wallet.getAssetsByWallet(wallet.id));
      const assetsList : IAssetWallet[] = [];
      assetsByWallet.forEach((assets : any = {}) => {
        const asset : IAssetWallet = {
          name : assets.name,
          amount : assets.amount
        }
        assetsList.push(asset);
      });
      this.wallets.push({ id : wallet.id, name: wallet.name, assets : assetsList });
    }
    this.wallets.forEach((wallet) => {
      let total : number = 0;
      wallet.assets.forEach((asset) => {
        const actualAsseet = this._sharesValues.get(asset.name);
        if (actualAsseet !== undefined)
          total += FinancialAsset.getTotalSharesOfAsset(actualAsseet.adj_close, asset.amount);
      });
      const info : any = {
        name : wallet.name,
        total,
        numberOfAssets : wallet.assets.length
      };
      this.walletsInfo.push(info);
    });
  }

  private async _getFinancialAssets() : Promise<void> {
    const { firstDay, lastDay } = this.date.getDays();
    const dataAssets =
      await firstValueFrom(this.financialAssetsData.getFinancialAssets(
        ASSETS,
        firstDay,
        lastDay
      ));
    this._sharesValues = FinancialAsset.getAverageFinancialAssetsData(dataAssets);
    console.log(this._sharesValues);
  }

  private _getIdUser() : void {
    const user : any = localStorage.getItem('user');
    const { id } = JSON.parse(user);
    this._idUser = id;
  }

  openModal(index : number) : void {
    this._eraseWalletIndex = index;
  }

  onEraseWallet() : void {
    const { id } = this.wallets[this._eraseWalletIndex];
    const { total } = this.walletsInfo[this._eraseWalletIndex];
    this.wallets.splice(this._eraseWalletIndex, 1);
    this.walletsInfo.splice(this._eraseWalletIndex, 1);
    this.money.addMoney(total, this._idUser);
    this.wallet.eraseWallet(id);
  }
}
