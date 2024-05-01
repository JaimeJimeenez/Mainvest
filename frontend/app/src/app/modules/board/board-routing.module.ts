import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardMainComponent } from './board-main/board-main.component';
import { BoardHomeComponent } from './board-home/board-home.component';
import { BoardFollowsComponent } from './board-follows/board-follows.component';

const routes : Routes = [
  {
    path: '',
    component: BoardMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home/:id',
        pathMatch: 'full'
      },
      {
        path: 'home/:id',
        component: BoardHomeComponent
      },
      {
        path: 'follows/:id',
        component: BoardFollowsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BoardRoutingModule { }
