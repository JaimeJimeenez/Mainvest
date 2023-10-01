import { NgModule } from '@angular/core';

import { WalletsRoutingModule } from './wallets-routing.module';

import { WalletsComponent } from './wallets.component';

@NgModule({
  imports: [ WalletsRoutingModule ],
  exports: [],
  declarations: [ WalletsComponent ],
  providers: [],
})
export class WalletsModule { }
