import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';

import { MarketComponent } from './market.component';
import { OverviewComponent } from './overview/overview.component';
import { TableComponent } from './overview/table/table.component';
import { TableLineComponent } from 'src/app/components/table-line/table-line.component';

@NgModule({
  imports: [MarketRoutingModule, CommonModule, TableLineComponent],
  exports: [],
  declarations: [MarketComponent, OverviewComponent, TableComponent],
  providers: [],
})
export class MarketModule { }
