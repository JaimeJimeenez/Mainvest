import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationNavComponent } from '../notification-nav/notification-nav.component';

@Component({
  selector: 'mainvest-notification-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NotificationNavComponent],
  templateUrl: './notification-main.component.html',
  styleUrls: ['./notification-main.component.scss']
})
export class NotificationMainComponent {

}
