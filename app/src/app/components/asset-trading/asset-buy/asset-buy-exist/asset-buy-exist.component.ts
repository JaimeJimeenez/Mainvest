import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradingObservableService } from 'src/app/service/observables/trading-observable.service';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  selector: 'mainvest-asset-buy-exist',
  templateUrl: './asset-buy-exist.component.html',
  styleUrls: ['./asset-buy-exist.component.scss']
})
export class AssetBuyExistComponent {
  @Input() wallets : any[] = [];
  @Input() close : number = 0;

  buyExistedForm : FormGroup;
  isButtonDisabled : boolean = false;
  money : number = 0;
  showError : boolean = false;

  constructor(private tradingObservable : TradingObservableService) {
    this._getUserMoney();

    this.buyExistedForm = new FormGroup({
      wallet : new FormControl('', [Validators.required]),
      amount : new FormControl('', [Validators.required, Validators.pattern(/^(\d+(\.\d{1,2})?)?$/)]),
    });

    this.buyExistedForm.get('amount')?.valueChanges.subscribe((value) => {
      const cost = this.close * value;
      this.isButtonDisabled = cost > this.money;
      this.showError = this.isButtonDisabled;
    });
  }

  private _getUserMoney() : void {
    const storedData : any = localStorage.getItem('user');
    const { money } = JSON.parse(storedData);
    this.money = money;
  }

  onExistedSubmit() : void {
    console.log('Existed submit');
    const { wallet, amount } = this.buyExistedForm.value;
    this.tradingObservable.tradingAsset({
      isBuying : true,
      isNewWallet : false,
      wallet,
      amount
    });
  }
}
