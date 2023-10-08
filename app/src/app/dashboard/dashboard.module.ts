import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashoboard-routing.module';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './main/menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule
  ],
  declarations: [MainComponent, MenuComponent],
})
export class DashboardModule { }
