import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert } from 'src/app/core/interfaces/alert';

@Component({
  selector: 'mainvest-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() alert: Alert = {
    idUser: 0,
    name: '',
    price: 0
  }

  
}
