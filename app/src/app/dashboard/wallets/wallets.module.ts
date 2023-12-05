import { NgModule } from '@angular/core';

import { WalletsRoutingModule } from './wallets-routing.module';

import { WalletsComponent } from './wallets.component';
import { NewWalletComponent } from '../profile/wallets/new-wallet/new-wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ WalletsRoutingModule, ReactiveFormsModule, CommonModule ],
  exports: [],
  declarations: [ WalletsComponent ],
  providers: [],
})
export class WalletsModule { }
