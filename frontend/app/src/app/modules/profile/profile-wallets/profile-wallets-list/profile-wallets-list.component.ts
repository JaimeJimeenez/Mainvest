import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { lastValueFrom } from 'rxjs';

import { ProfileWalletsNavComponent } from '../profile-wallets-nav/profile-wallets-nav.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';
import { Asset, Wallet } from 'src/app/core/interfaces/wallet';
import { WalletComponent } from 'src/app/shared/components/wallet/wallet.component';
import { MarketRepository } from 'src/app/core/repositories/market.repository';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';
import { ASSETS } from 'src/app/const/asset';

@Component({
  selector: 'mainvest-profile-wallets-list',
  standalone: true,
  imports: [CommonModule, ProfileWalletsNavComponent, WalletComponent],
  templateUrl: './profile-wallets-list.component.html',
  styleUrls: ['./profile-wallets-list.component.scss']
})
export class ProfileWalletsListComponent {
  public userId: number = 0;
  public wallets: Wallet[] = [];
  public assets: Map<string, number> = new Map<string, number>;

  constructor(
    private route: ActivatedRoute,
    private userIdObservable: UserIdObservableService,
    private walletRepository: WalletRepositoryImpl,
    private marketRepository: MarketRepositoryImpl
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
  }

  private async _getWallets(): Promise<void> {
    try {
      this.wallets = await lastValueFrom(this.walletRepository.getWallets$(this.userId));
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
