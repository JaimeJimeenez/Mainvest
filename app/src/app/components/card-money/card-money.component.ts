import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';

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

}
