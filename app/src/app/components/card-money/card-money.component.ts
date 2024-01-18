import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
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
  money : number = 0;

  constructor(private moneyObservable : MoneyObservableService) {
    this._getMoneyUser();
    this.moneyObservable.moneyData$.subscribe(
      (value) => {
        this.money = value
      }
    );
  }

  private _getMoneyUser() : void {
    const user : any = localStorage.getItem('user');
    const { money } = JSON.parse(user);
    this.money = money;
  }
}
