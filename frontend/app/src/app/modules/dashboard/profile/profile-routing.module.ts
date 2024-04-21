import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileMainComponent } from './profile-main/profile-main.component';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'main/:id',
    pathMatch: 'full'
  },
  {
    path: 'main/:id',
    component: ProfileMainComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProfileRoutingModule { }
