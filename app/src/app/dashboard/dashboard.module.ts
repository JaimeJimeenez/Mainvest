import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashoboard-routing.module';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './main/menu/menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    SearchComponent,
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
  ],
  declarations: [MainComponent, MenuComponent],
})
export class DashboardModule { }
