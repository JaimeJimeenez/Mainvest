import { NgModule } from '@angular/core';

import { MarketRoutingModule } from './market-routing.module';

import { MarketComponent } from './market.component';

@NgModule({
  imports: [ MarketRoutingModule ],
  exports: [],
  declarations: [ MarketComponent ],
  providers: [],
})
export class MarketModule { }
