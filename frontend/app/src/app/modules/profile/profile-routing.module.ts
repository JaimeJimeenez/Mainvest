import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';

const routes : Routes = [
  {
    path: '',
    component: ProfileMainComponent,
    children: [
      {
        path: 'settings/:id',
        component: ProfileSettingsComponent
      },
      {
        path: 'home/:id',
        component: ProfileHomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProfileRoutingModule { }
