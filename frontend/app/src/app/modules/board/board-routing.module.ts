import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardMainComponent } from './board-main/board-main.component';
import { BoardHomeComponent } from './board-home/board-home.component';

const routes : Routes = [
  {
    path: '',
    component: BoardMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: BoardHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BoardRoutingModule { }
