import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './info/info.component';
import { SubmenuComponent } from 'src/app/components/submenu/submenu.component';
import { CardMoneyComponent } from 'src/app/components/card-money/card-money.component';

@NgModule({
  imports: [
    CommonModule,
    SubmenuComponent,
    CardMoneyComponent,
    ProfileRoutingModule
  ],
  exports: [],
  declarations: [ ProfileComponent, ProfileInfoComponent ],
})
export class ProfileModule { }
