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
        pathMatch: 'full'
      },
      {
        path: 'market',
        loadChildren: () =>
          import('../market/market.module').then(
            (module) => module.MarketModule
          )
      },
      {
        path: 'board',
        loadChildren: () =>
          import('../board/board.module').then(
            (module) => module.BoardModule
          )
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(
            (module) => module.ProfileModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule { }
