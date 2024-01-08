import { CommonModule } from '@angular/common';
import { Component, Input, LOCALE_ID } from '@angular/core';

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es-EUR');

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mainvest-table-line',
  templateUrl: './table-line.component.html',
  styleUrls: ['./table-line.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-EUR',
    }
  ]
})
export class TableLineComponent {
  @Input() asset : any;

  getAbsolute(value : number) : number {
    return Math.abs(value);
  }
}
