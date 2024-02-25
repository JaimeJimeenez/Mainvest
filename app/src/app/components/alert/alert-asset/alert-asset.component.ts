import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlertPrice } from 'src/app/interface/alert/alert';

@Component({
  selector: 'mainvest-alert-asset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-asset.component.html',
  styleUrls: ['./alert-asset.component.scss']
})
export class AlertAssetComponent {
  @Input() alertPrice : IAlertPrice = {
    id: 0,
    id_user: 0,
    asset: '',
    price: 0,
    reached: false
  }

  onDeleteAlert() : void {
    
  }
}
