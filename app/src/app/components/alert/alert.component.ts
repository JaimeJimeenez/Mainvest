import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlert } from 'src/app/interface/alert/alert';
import { AlertCommentComponent } from './alert-comment/alert-comment.component';
import { AlertLikedComponent } from './alert-liked/alert-liked.component';

@Component({
  selector: 'mainvest-alert',
  standalone: true,
  imports: [CommonModule, AlertCommentComponent, AlertLikedComponent],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() isComment : boolean = true;
  @Input() alert : IAlert = {
    id: 0,
    username: '',
    id_transmitter: 0,
    message: '',
    read: false,
    liked: false
  };
}
