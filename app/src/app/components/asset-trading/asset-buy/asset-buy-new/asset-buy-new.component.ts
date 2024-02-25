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
  selector: 'mainvest-asset-buy-new',
  templateUrl: './asset-buy-new.component.html',
  styleUrls: ['./asset-buy-new.component.scss']
})
export class AssetBuyNewComponent {
  @Input() wallets : any[] = [];
  @Input() close : number = 0;

  buyNewForm : FormGroup;
  isButtonDisabled : boolean = false;
  money : number = 0;
  showError : boolean = false;

  constructor(private tradingObservable : TradingObservableService) {
    this._getUserMoney();

    this.buyNewForm = new FormGroup({
      wallet : new FormControl('', [Validators.required]),
      amount : new FormControl('', [Validators.required, Validators.pattern(/^(\d+(\.\d{1,2})?)?$/)]),
    });

    this.buyNewForm.get('amount')?.valueChanges.subscribe((value) => {
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

  onNewSubmit() : void {
    const { wallet, amount } = this.buyNewForm.value;
    this.tradingObservable.tradingAsset({
      isBuying : true,
      isNewWallet : true,
      wallet,
      amount
    });
  }
}
