import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletsMainComponent } from './wallets-main/wallets-main.component';
import { WalletsHomeComponent } from './wallets-home/wallets-home.component';
import { ProfileNewWalletComponent } from './profile-new-wallet/profile-new-wallet.component';

const routes : Routes = [
  {
    path: '',
    component: WalletsMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list/:id',
        component: WalletsHomeComponent,
      },
      {
        path: 'new/:id',
        component: ProfileNewWalletComponent
      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WalletsRoutingModule { }
