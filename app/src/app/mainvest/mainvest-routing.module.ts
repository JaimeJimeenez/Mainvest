import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

const routes : Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'market',
        pathMatch: 'full',
      },
      {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
      },
      {
        path: 'market',
        loadChildren: () => import('./market/market.module').then(m => m.MarketModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'wallets',
        loadChildren: () => import('./wallets/wallets.module').then(m => m.WalletsModule),
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class MainvestRoutingModule { }

