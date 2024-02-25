import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlert, IAlertPrice } from 'src/app/interface/alert/alert';
import { AlertCommentComponent } from './alert-comment/alert-comment.component';
import { AlertLikedComponent } from './alert-liked/alert-liked.component';
import { AlertAssetComponent } from './alert-asset/alert-asset.component';

@Component({
  selector: 'mainvest-alert',
  standalone: true,
  imports: [CommonModule, AlertCommentComponent, AlertLikedComponent, AlertAssetComponent],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() isAlertPrice : boolean = false;
  @Input() isComment : boolean = true;
  @Input() alert : IAlert = {
    id: 0,
    username: '',
    id_transmitter: 0,
    message: '',
    read: false,
    liked: false
  };
  @Input() alertPrice : IAlertPrice = {
    id: 0,
    id_user: 0,
    asset: '',
    price: 0,
    reached: false
  }
}
