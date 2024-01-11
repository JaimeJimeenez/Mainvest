import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, LOCALE_ID, Output } from '@angular/core';

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
  @Output() onRequestedAsset = new EventEmitter<string>();

  getAbsolute(value : number) : number {
    return Math.abs(value);
  }

  getAssetInfo(name : string) : void {
    this.onRequestedAsset.emit(name);
  }
}
