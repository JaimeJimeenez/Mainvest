import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { ExistedWalletComponent } from './existed-wallet/existed-wallet.component';
import { NewWalletComponent } from './new-wallet/new-wallet.component';

import { LocalStorage } from 'src/app/core/libs/local.storage';
import { User } from 'src/app/core/interfaces/user';
import { InfoTrade } from 'src/app/core/interfaces/trade';
import { Asset } from 'src/app/core/interfaces/market';

import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';

@Component({
  selector: 'mainvest-trading',
  standalone: true,
  imports: [CommonModule, ExistedWalletComponent, NewWalletComponent],
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent {
  private _buyWalletOption: string[] = ['Comprar con nueva cartera', 'Comprar con cartera existente'];

  public isBuying: boolean = true;
  public walletOption: string = this._buyWalletOption[0];
  public isNewWallet: boolean = true;
  public isLogedIn: boolean = false;
  public tradeInfo: InfoTrade = {
    idUser: 0,
    asset: '',
    price: 0,
    money: 0
  }

  constructor(
    private route: ActivatedRoute,
    private userRepository: UserRepositoryImpl,
    private marketRepository: MarketRepositoryImpl
  ) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const asset: string | null = params.get('name');
      if (asset !== null) {
        const money = await this._getUserMoney();
        const idUser = this._authenticateUser();
        const price = await this._getAssetPrice(asset);
        this.tradeInfo = { idUser, asset, price, money };
        console.log(this.tradeInfo);
      }
    });
  }

  private async _getAssetPrice(asset: string): Promise<number> {
    try {
      const data: Map<string, Asset[]> = await lastValueFrom(this.marketRepository.getTodayAssetsData$([asset]));
      const assetData = data.get(asset);
      if (assetData !== undefined) {
        const price = assetData.reverse()[0].adj_close;
        return price;
      }
    } catch (error) {
      console.error(error);
    }
    return 0;
  }

  private async _getUserMoney(): Promise<number> {
    try {
      const user: User | undefined = LocalStorage.getUser();
      if (user !== undefined) {
        return await lastValueFrom(this.userRepository.getMoney$(user.id));
      }
    } catch (error) {
      console.error(error);
    }
    return 0;
  }

  private _authenticateUser(): number {
    const user: User | undefined = LocalStorage.getUser();
    this.isLogedIn = user !== undefined;
    return user !== undefined ? user.id! : 0;
  }

  public updateTradingOptions(isBuying: boolean, walletOption?: number) {
    this.isBuying = isBuying
    if (this.isBuying && walletOption !== undefined) {
      this.walletOption = this._buyWalletOption[walletOption];
      this.isNewWallet = walletOption == 0;
    }
  }
}
