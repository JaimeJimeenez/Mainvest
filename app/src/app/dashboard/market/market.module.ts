import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';

import { MarketComponent } from './market.component';
import { OverviewComponent } from './overview/overview.component';
import { TableComponent } from './overview/table/table.component';
import { TableLineComponent } from 'src/app/components/table-line/table-line.component';
import { AssetComponent } from './asset/asset.component';
import { AssetTradingComponent } from 'src/app/components/asset-trading/asset-trading.component';
import { PredictionComponent } from 'src/app/components/prediction/prediction.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MarketRoutingModule,
    CommonModule,
    TableLineComponent,
    AssetTradingComponent,
    PredictionComponent
  ],
  exports: [],
  declarations: [
    MarketComponent,
    OverviewComponent,
    TableComponent,
    AssetComponent
  ],
  providers: [],
})
export class MarketModule { }
