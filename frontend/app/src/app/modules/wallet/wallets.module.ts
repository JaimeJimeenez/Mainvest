import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';

@NgModule({
  declarations: [],
  imports: [CommonModule, WalletsRoutingModule],
  providers: [WalletRepositoryImpl]
})
export class WalletsModule { }
