import { CommonModule } from '@angular/common';
import { Component, Input, LOCALE_ID } from '@angular/core';

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { Subscription } from 'rxjs';
import { MoneyObservableService } from 'src/app/service/observables/money-observable.service';

registerLocaleData(localeEs, 'es-EUR');

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'mainvest-card-money',
  templateUrl: './card-money.component.html',
  styleUrls: ['./card-money.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-EUR',
    }
  ]
})
export class CardMoneyComponent {
  @Input() money : number = 0;
  private _subscriptionMoney : Subscription;

  constructor(private moneyObservable : MoneyObservableService) {
    this._subscriptionMoney = this.moneyObservable.moneyData$.subscribe(
      (money) => this.money = money
    )
  }

  ngOnDestroy() : void {
    this._subscriptionMoney.unsubscribe();
  }
}
