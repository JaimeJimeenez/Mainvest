import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription, lastValueFrom } from 'rxjs';

import { numericalValidator } from 'src/app/core/validator/numerical.validator';

import { Market } from 'src/app/core/libs/market';
import { InfoTrade } from 'src/app/core/interfaces/trade';

import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';
import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';
import { Asset } from 'src/app/core/interfaces/wallet';
import { WalletLib } from 'src/app/core/libs/wallet';

@Component({
  selector: 'mainvest-new-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-wallet.component.html',
  styleUrls: ['./new-wallet.component.scss']
})
export class NewWalletComponent {
  private _subscriptionTrading: Subscription;

  @Input() tradeInfo: InfoTrade = {
    idUser: 0,
    asset: '',
    price: 0,
    money: 0
  };
  public newWalletForm: FormGroup;
  public isButtonEnabled: boolean = true;
  public totalCost: number = 0;

  constructor(private walletRepository: WalletRepositoryImpl, private userRepository: UserRepositoryImpl) {
    this.newWalletForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      amount: new FormControl('', [Validators.required, numericalValidator()])
    });
    this._subscriptionTrading = this.newWalletForm.get('amount')!.valueChanges.subscribe(
      (amount: string) => {
        this.totalCost = Market.getTotalCost(this.tradeInfo.price, +amount);
        this.isButtonEnabled = this.totalCost <= this.tradeInfo.money && +amount > 0;
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tradeInfo']) {
      this.tradeInfo = changes['tradeInfo'].currentValue;
    }
  }

  async onSubmit(): Promise<void> {
    const { name, amount } = this.newWalletForm.value;

    try {
      const { idUser, asset } = this.tradeInfo;
      const buyAsset: Asset = { name: asset, amount };

      const idWallet: number = await lastValueFrom(this.walletRepository.createWallet$(idUser, name));
      const assets: any[] = await lastValueFrom(this.walletRepository.addAssets$([ buyAsset ]));

      const idsAssets: any[] = assets.map((asset) => (Object.values(asset))).flat();
      const ids: number[] = WalletLib.assignIdWalletToIdsAssets(idWallet, idsAssets);

      await lastValueFrom(this.walletRepository.assignAssetsToWallet$(ids));
      await lastValueFrom(this.userRepository.updateMoney$(idUser, -this.totalCost));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this._subscriptionTrading.unsubscribe();
  }
}
