import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewWalletComponent } from './new-wallet/new-wallet.component';
import { ModifyWalletComponent } from './modify-wallet/modify-wallet.component';
import { ListWalletsComponent } from './list-wallets/list-wallets.component';
import { ViewWalletComponent } from './view-wallet/view-wallet.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list-wallets',
        pathMatch: 'full',
      },
      {
        path: 'list-wallets',
        component: ListWalletsComponent,
        pathMatch: 'full',
      },
      {
        path: 'new-wallet',
        component: NewWalletComponent,
        pathMatch: 'full',
      },
      {
        path: 'modify-wallet/:id',
        component: ModifyWalletComponent,
        pathMatch: 'full'
      },
      {
        path: 'view-wallet/:id',
        component: ViewWalletComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletsRoutingModule { }
