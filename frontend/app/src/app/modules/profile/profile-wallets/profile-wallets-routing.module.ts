import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileWalletsMainComponent } from './profile-wallets-main/profile-wallets-main.component';
import { ProfileWalletsListComponent } from './profile-wallets-list/profile-wallets-list.component';

const routes : Routes = [
  {
    path: '',
    component: ProfileWalletsMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list/:id',
        component: ProfileWalletsListComponent,
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProfileWalletsRoutingModule { }
