import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketMainComponent } from './market-main/market-main.component';
import { MarketHomeComponent } from './market-home/market-home.component';
import { MarketAssetComponent } from './market-asset/market-asset.component';

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
      },
      {
        path: 'asset/:name',
        component: MarketAssetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule { }
