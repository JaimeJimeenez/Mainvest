import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketMainComponent } from './market-main/market-main.component';
import { MarketHomeComponent } from './market-home/market-home.component';

const routes: Routes = [
  {
    path: '',
    component: MarketMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home/:id',
        component: MarketHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule { }
