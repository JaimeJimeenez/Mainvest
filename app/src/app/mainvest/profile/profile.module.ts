import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [ProfileRoutingModule],
  exports: [ProfileComponent],
  declarations: [ProfileComponent],
})
export class ProfileModule { }
