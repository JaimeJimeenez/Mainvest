import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModalAlertComponent } from 'src/app/shared/components/modals/modal-alert/modal-alert.component';
import { PredictionComponent } from 'src/app/shared/components/prediction/prediction.component';
import { TradingComponent } from 'src/app/shared/components/trading/trading.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ModalAlertComponent,
    TradingComponent,
    PredictionComponent
  ],
  selector: 'mainvest-asset-options',
  templateUrl: './asset-options.component.html',
  styleUrls: ['./asset-options.component.scss']
})
export class AssetOptionsComponent {
  @Input() asset: string = '';
  @Output() timeSelected: EventEmitter<number> = new EventEmitter<number>();

  public optionSelected: number = 0;

  updateOption(option: number): void {
    this.optionSelected = option;
  }

  updateTime(option: number): void {
    this.timeSelected.emit(option);
  }
}
