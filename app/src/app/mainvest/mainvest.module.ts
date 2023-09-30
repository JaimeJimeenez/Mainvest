import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainvestRoutingModule } from './mainvest-routing.module';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './main/menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MainvestRoutingModule,
    RouterModule
  ],
  declarations: [MainComponent, MenuComponent],
})
export class MainvestModule { }
