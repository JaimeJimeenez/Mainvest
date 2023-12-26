import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom, firstValueFrom } from 'rxjs';

import { ASSETS } from 'src/app/const/financial_assets';
import { IAsset } from 'src/app/interface/financial/iAssets';
import { IWallet, IAssetWallet, IWalletInfo } from 'src/app/interface/financial/iWallet';
import { FinancialAsset } from 'src/app/lib/financial_asset';
import { Wallet } from 'src/app/lib/wallet';
import { DateService } from 'src/app/service/common/date.service';
import { SearchObservableService } from 'src/app/service/observables/search-observable.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';
import { MoneyService } from 'src/app/service/user/money.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'mainvest-list-wallets',
  templateUrl: './list-wallets.component.html',
  styleUrls: ['./list-wallets.component.scss']
})
export class ListWalletsComponent {
  private _idUser : number = 0;
  private _sharesValues : Map<string, IAsset> = new Map<string, IAsset>();
  private _eraseWalletIndex : number = -1;
  private _subscriptionSearch : Subscription;
  private _allWalletsInfo : Array<IWalletInfo> = [];

  public wallets : IWallet[] = [];
  public searchWallets : IWallet[] = [];
  public walletsInfo : Array<IWalletInfo> = [];
  public benefitsWallets : number[] = [];

  constructor(
    private wallet : WalletService,
    private date : DateService,
    private money : MoneyService,
    private financialAssetsData : FinancialAssetsDataService,
    private searchObservable : SearchObservableService,
    private router : Router
  ) {
    this._getIdUser();
    this._getWalletsByUser();
    this._subscriptionSearch = this.searchObservable.searchData$.subscribe(
      (value) => this._searchWallet(value)
    )
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
          amount : assets.amount,
        };
        assetsList.push(asset);
      });
      this.wallets.push({ id : wallet.id, name: wallet.name, assets : assetsList });
    }
    this._allWalletsInfo = Wallet.getWalletsInfo(this.wallets, this._sharesValues);
    this.walletsInfo = this._allWalletsInfo;
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
  }

  private _getIdUser() : void {
    const user : any = localStorage.getItem('user');
    const { id } = JSON.parse(user);
    this._idUser = id;
  }

  private _searchWallet(wallet: string): void {
    const searchTermLower = wallet.toLowerCase();
    this.walletsInfo = this._allWalletsInfo.filter(
      (row) => row.name.toLowerCase().includes(searchTermLower)
    );
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

  onShowWallet(index : number) : void {
    const { id } = this.wallets[index];
    this.router.navigate([`/dashboard/profile/wallets/view-wallet/`, id]);
  }

  onModifyWallet(index : number) : void {
    const { id } = this.wallets[index];
    this.router.navigate([`/dashboard/profile/wallets/modify-wallet/`, id]);
  }

  ngOnDestroy() {
    this._subscriptionSearch.unsubscribe;
  }
}
