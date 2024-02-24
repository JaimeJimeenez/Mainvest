import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsListComponent } from './alerts-list/alerts-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list/:id',
    component: AlertsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule { }
