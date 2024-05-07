import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription, findIndex, lastValueFrom } from 'rxjs';

import { DropdownWalletsComponent } from '../../dropdown/dropdown-wallet/dropdown-wallet.component';

import { numericalValidator } from 'src/app/core/validator/numerical.validator';
import { InfoTrade } from 'src/app/core/interfaces/trade';
import { Asset, Wallet } from 'src/app/core/interfaces/wallet';
import { Market } from 'src/app/core/libs/market';

import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';
import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';
import { WalletLib } from 'src/app/core/libs/wallet';

@Component({
  selector: 'mainvest-existed-wallet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownWalletsComponent],
  templateUrl: './existed-wallet.component.html',
  styleUrls: ['./existed-wallet.component.scss']
})
export class ExistedWalletComponent {
  private _subscriptionTrading: Subscription;
  private _wallet: Wallet = {
    id: 0,
    name: '',
    total_value: 0,
    assets: []
  }

  @Input() tradeInfo: InfoTrade = {
    idUser: 0,
    asset: '',
    price: 0,
    money: 0
  };
  @Input() isBuying: boolean = true;

  public existedWalletForm: FormGroup;
  public isButtonEnabled: boolean = true;
  public totalCost: number = 0;
  public wallets: Wallet[] = [];
  public totalAssetAmount = 0;

  constructor(private walletRepository: WalletRepositoryImpl, private userRepository: UserRepositoryImpl) {
    this.existedWalletForm = new FormGroup({
      amount: new FormControl('', [Validators.required, numericalValidator()])
    });
    this._subscriptionTrading = this.existedWalletForm.get('amount')!.valueChanges.subscribe(
      (amount: string) => {
        this.totalCost = Market.getTotalCost(this.tradeInfo.price, +amount);
        if (this.isBuying) {
          this.isButtonEnabled = this.totalCost <= this.tradeInfo.money && +amount > 0;
        } else {
          this.isButtonEnabled = +amount <= this.totalAssetAmount;
        }
      }
    )
  }

  async ngOnInit(): Promise<void> {
    this.wallets = await lastValueFrom(this.walletRepository.getWallets$(this.tradeInfo.idUser));
  }

  onSelectedWallet(index: number): void {
    this._wallet = this.wallets[index];
    if (this._wallet.assets !== undefined) {
      const assetIndex = this._wallet.assets.findIndex((asset: any) => asset.name === this.tradeInfo.asset);
      const asset = this._wallet.assets[assetIndex];
      if (asset !== undefined) {
        this.totalAssetAmount = asset.amount;
      } else {
        this.totalAssetAmount = 0;
      }
    }
  }

  async onSubmit(): Promise<void> {
    const { amount } = this.existedWalletForm.value;
    const { idUser, asset } = this.tradeInfo;
    const findIndex = this._wallet.assets?.findIndex((asset: any) => asset.name === this.tradeInfo.asset);
    console.log(this._wallet);
    if (this.isBuying) {

      if (findIndex !== -1) {
        const sucess: boolean = await lastValueFrom(this.walletRepository.updateWalletAssets$(this._wallet.assets[findIndex].id!, amount));
        await lastValueFrom(this.userRepository.updateMoney$(idUser, -this.totalCost));
      } else {
        const buyAsset: Asset = { name: asset, amount };
        const assets: any[] = await lastValueFrom(this.walletRepository.addAssets$([buyAsset]));

        const idsAssets: any[] = assets.map((asset) => (Object.values(asset))).flat();
        const ids: number[] = WalletLib.assignIdWalletToIdsAssets(this._wallet.id, idsAssets);

        await lastValueFrom(this.walletRepository.assignAssetsToWallet$(ids));
        await lastValueFrom(this.userRepository.updateMoney$(idUser, -this.totalCost));
      }
    } else {
      const sucess: boolean = await lastValueFrom(this.walletRepository.updateWalletAssets$(this._wallet.assets[findIndex].id!, -amount));
      await lastValueFrom(this.userRepository.updateMoney$(idUser, +this.totalCost));
    }
    window.location.reload();
  }

  ngOnDestroy(): void {
    this._subscriptionTrading.unsubscribe();
  }
}
