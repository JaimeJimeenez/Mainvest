import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAlert } from 'src/app/interface/alert/alert';
import { AlertDeleteObservableService } from 'src/app/service/observables/alert/alert-delete-observable.service';

@Component({
  selector: 'mainvest-alert-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-comment.component.html',
  styleUrls: ['./alert-comment.component.scss']
})
export class AlertCommentComponent {
  @Input() alert : IAlert = {
    id: 0,
    id_transmitter: 0,
    username: '',
    message: '',
    read: false,
    liked: false
  };

  constructor(private alertDeleteObservable : AlertDeleteObservableService) {}

  onDeleteAlert() : void {
    this.alertDeleteObservable.deleteAlert(this.alert.id);
  }
}
