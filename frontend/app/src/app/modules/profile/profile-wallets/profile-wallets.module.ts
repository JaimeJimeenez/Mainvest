import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileWalletsRoutingModule } from './profile-wallets-routing.module';
import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProfileWalletsRoutingModule],
  providers: [WalletRepositoryImpl]
})
export class ProfileWalletsModule { }
