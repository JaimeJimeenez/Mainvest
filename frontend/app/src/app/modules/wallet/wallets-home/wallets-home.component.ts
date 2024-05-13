import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { WalletsNavComponent } from '../wallets-nav/wallets-nav.component';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { WalletComponent } from 'src/app/shared/components/wallet/wallet.component';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';
import { ASSETS } from 'src/app/const/asset';
import { SearchObservableService } from 'src/app/core/services/observables/search-observable.service';

@Component({
  selector: 'mainvest-wallets-home',
  standalone: true,
  imports: [CommonModule, WalletsNavComponent, WalletComponent],
  templateUrl: './wallets-home.component.html',
  styleUrls: ['./wallets-home.component.scss']
})
export class WalletsHomeComponent {
  public userId: number = 0;
  public wallets: Wallet[] = [];
  public assets: Map<string, number> = new Map<string, number>;
  public walletsData: Wallet[] = [];

  constructor(
    private route: ActivatedRoute,
    private userIdObservable: UserIdObservableService,
    private walletRepository: WalletRepositoryImpl,
    private marketRepository: MarketRepositoryImpl,
    private searchObservable: SearchObservableService
  ) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this.userId = +id;
        this.userIdObservable.sendUserId(this.userId);
        await this._getAssetsData();
        await this._getWallets();
      }
    });

    this.searchObservable.search$.subscribe((search: string) => {
      this._searchWallet(search);
    });
  }

  private _searchWallet(search: string): void {
    const wallet = search.toLowerCase();
    this.walletsData = this.wallets.filter(
      (input_wallet) => input_wallet.name.toLowerCase().includes(wallet)
    );
  }

  private async _getWallets(): Promise<void> {
    try {
      this.wallets = await lastValueFrom(this.walletRepository.getWallets$(this.userId));
      this.walletsData = this.wallets;
    } catch (error) {
      console.error(error);
    }
  }

  private async _getAssetsData(): Promise<void> {
    try {
      const assetsData = await lastValueFrom(this.marketRepository.getTodayAssetsData$(ASSETS));
      ASSETS.forEach((asset: string) => {
        const price = assetsData.get(asset);
        if (price !== undefined) {
          this.assets.set(asset, price[0].adj_close);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
