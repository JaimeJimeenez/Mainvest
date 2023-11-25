import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusService } from 'src/app/service/httpInterceptors/status.service';

@Component({
  selector: 'mainvest-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  private quantityTasks : Subscription;
  private activateTasks : number = 0;

  constructor(private status : StatusService) {
    this.quantityTasks = this.status.openTasks$.subscribe(
      (activateTasks) => this.activateTasks  = activateTasks
    );
  }

  showLoading() : boolean {
    return this.activateTasks > 0;
  }

  ngOnDestroy() {
    this.quantityTasks.unsubscribe;
  }
}
