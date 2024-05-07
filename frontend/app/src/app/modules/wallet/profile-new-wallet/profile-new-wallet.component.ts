import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, lastValueFrom } from 'rxjs';

import { ASSETS } from 'src/app/const/asset';
import { DropdownAssetComponent } from 'src/app/shared/components/dropdown/dropdown-asset/dropdown-asset.component';

import { numericalValidator } from 'src/app/core/validator/numerical.validator';
import { WalletLib } from 'src/app/core/libs/wallet';
import { Asset } from 'src/app/core/interfaces/wallet';
import { Market } from 'src/app/core/libs/market';

import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';
import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';
import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { WalletsNavComponent } from '../wallets-nav/wallets-nav.component';

@Component({
  selector: 'mainvest-profile-new-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownAssetComponent, WalletsNavComponent],
  templateUrl: './profile-new-wallet.component.html',
  styleUrls: ['./profile-new-wallet.component.scss']
})
export class ProfileNewWalletComponent {
  public _userId: number = 0;
  private _asset: string = ASSETS[0];
  private _subscriptionTrading: Subscription;

  public newWalletForm: FormGroup;
  public money: number = 0;
  public isButtonEnabled: boolean = false;
  public totalCost: number = 0;
  public assetPrice: number = 0;


  constructor(
    private route: ActivatedRoute,
    private userRepository: UserRepositoryImpl,
    private walletRepository: WalletRepositoryImpl,
    private marketRepository: MarketRepositoryImpl,
    private userIdObservable: UserIdObservableService
  ) {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id: string | null = params.get('id');
      if (id !== null) {
        this._userId = +id;
        this.money = await lastValueFrom(this.userRepository.getMoney$(+id))
        this.userIdObservable.sendUserId(+id);
      }
    });
    this.newWalletForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      amount: new FormControl('', [Validators.required, numericalValidator()])
    });
    this._subscriptionTrading = this.newWalletForm.get('amount')!.valueChanges.subscribe(
      (amount: string) => {
        this.totalCost = Market.getTotalCost(this.assetPrice, +amount);
        this.isButtonEnabled = this.totalCost <= this.money && +amount > 0;
      }
    )
  }

  async onSelectedAsset(asset: string): Promise<void> {
    try {
      this._asset = asset;
      const data: Map<string, any[]> = await lastValueFrom(this.marketRepository.getTodayAssetsData$([asset]));
      const assetData = data.get(asset);
      if (assetData !== undefined) {
        const price = assetData.reverse()[0].adj_close;
        this.assetPrice = price;
      }
    } catch (error) {
      throw error;
    }
  }

  async onSubmit(): Promise<void> {
    const { name, amount } = this.newWalletForm.value;

    try {
      const buyAsset: Asset = { name: this._asset, amount };

      const idWallet: number = await lastValueFrom(this.walletRepository.createWallet$(this._userId, name));
      const assets: any[] = await lastValueFrom(this.walletRepository.addAssets$([ buyAsset ]));

      const idsAssets: any[] = assets.map((asset) => (Object.values(asset))).flat();
      const ids: number[] = WalletLib.assignIdWalletToIdsAssets(idWallet, idsAssets);

      await lastValueFrom(this.walletRepository.assignAssetsToWallet$(ids));
      await lastValueFrom(this.userRepository.updateMoney$(this._userId, -this.totalCost));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this._subscriptionTrading.unsubscribe();
  }
}
