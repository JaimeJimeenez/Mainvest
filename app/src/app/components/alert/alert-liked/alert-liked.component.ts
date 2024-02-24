import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlert } from 'src/app/interface/alert/alert';

@Component({
  selector: 'mainvest-alert-liked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-liked.component.html',
  styleUrls: ['./alert-liked.component.scss']
})
export class AlertLikedComponent {
  @Input() alert : IAlert = {
    id: 0,
    id_transmitter: 0,
    username: '',
    message: '',
    read: false,
    liked: false,
  };
}
