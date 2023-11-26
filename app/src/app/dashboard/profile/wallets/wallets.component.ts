import { Component } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ASSETS } from 'src/app/const/financial_assets';
import { IAsset } from 'src/app/interface/financial/iAssets';

import { IAssetWallet, IWallet } from 'src/app/interface/financial/iWallet';
import { Wallet } from 'src/app/lib/wallet';
import { DateService } from 'src/app/service/common/date.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'mainvest-profile-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent {
  private _idUser : number = 0;

  public wallets : IWallet[] = [];
  public benefitsWallets : number[] = [];

  constructor(
    private wallet : WalletService,
    private date : DateService,
    private financialAssetsData : FinancialAssetsDataService,
  ) {
    this._getIdUser();
    this._getWalletsByUser();
    this._getFinancialAssets();
  }

  private async _getWalletsByUser() : Promise<void> {
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
      this.wallets.push({ name: wallet.name, assets : assetsList });
    }
  }

  private async _getFinancialAssets() : Promise<void> {
    const { firstDay, lastDay } = this.date.getDays();
    const dataAssets =
      await firstValueFrom(this.financialAssetsData.getFinancialAssets(
        ASSETS,
        firstDay,
        lastDay
      ));
  }

  private _getIdUser() : void {
    const user : any = localStorage.getItem('user');
    const { id } = JSON.parse(user);
    this._idUser = id;
  }
}
