import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SubmenuModel } from 'src/app/core/models/submenu.model';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule],
  providers: [SubmenuModel]
})
export class DashboardModule { }
