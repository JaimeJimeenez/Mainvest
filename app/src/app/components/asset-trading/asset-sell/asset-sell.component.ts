import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { TradingObservableService } from 'src/app/service/observables/trading-observable.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  selector: 'mainvest-asset-sell',
  templateUrl: './asset-sell.component.html',
  styleUrls: ['./asset-sell.component.scss']
})
export class AssetSellComponent {
  @Input() wallets : any[] = [];

  private _amountInputed : number = 0;

  sellForm : FormGroup;
  maxValue : number = 0;
  isButtonDisabled : boolean = true;

  constructor(private tradingObservable : TradingObservableService) {
    this.sellForm = new FormGroup({
      wallet : new FormControl('', [Validators.required]),
      amount : new FormControl('', [Validators.required, Validators.pattern(/^(\d+(\.\d{1,2})?)?$/)]),
    });
    this.sellForm.get('amount')?.valueChanges.subscribe((value) => {
      this.isButtonDisabled = +value <= 0 || +value > this.maxValue;
      this._amountInputed = +value;
    });
  }

  getMaxValue(event : Event) {
    const target = event.target as HTMLSelectElement;
    const wallet = this.wallets.find((element : any) => element.id === +target.value);
    if (wallet) this.maxValue = +wallet.amount;
    this.isButtonDisabled = this._amountInputed <= 0 || this._amountInputed > this.maxValue;
  }

  onSubmit() {
    const { wallet, amount } = this.sellForm.value;
    const walletFounded = this.wallets.find((element : any) => element.id === +wallet);
    this.tradingObservable.tradingAsset({
      isBuying : false,
      wallet,
      amount,
      isAllIn : amount === walletFounded.amount
    });
  }
}
