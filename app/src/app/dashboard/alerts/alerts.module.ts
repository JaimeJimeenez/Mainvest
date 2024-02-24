import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsListComponent } from './alerts-list/alerts-list.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';


@NgModule({
  declarations: [
    AlertsListComponent
  ],
  imports: [
    AlertComponent,
    CommonModule,
    AlertsRoutingModule
  ]
})
export class AlertsModule { }
