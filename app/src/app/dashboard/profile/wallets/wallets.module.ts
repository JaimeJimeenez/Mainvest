import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { ModifyWalletComponent } from './modify-wallet/modify-wallet.component';
import { ViewWalletComponent } from './view-wallet/view-wallet.component';
import { ListWalletsComponent } from './list-wallets/list-wallets.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { NewWalletComponent } from './new-wallet/new-wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedWalletsComponent } from './shared-wallets/shared-wallets.component';


@NgModule({
  declarations: [
    SharedWalletsComponent,
    ModifyWalletComponent,
    ViewWalletComponent,
    ListWalletsComponent,
    NewWalletComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SearchComponent,
    CommonModule,
    WalletsRoutingModule
  ]
})
export class WalletsModule { }
