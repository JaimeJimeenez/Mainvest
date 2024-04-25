import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MarketRoutingModule
  ],
  providers: [MarketRepositoryImpl]
})
export class MarketModule { }
