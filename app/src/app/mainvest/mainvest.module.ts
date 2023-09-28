import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainvestRoutingModule } from './mainvest-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    MainvestRoutingModule
  ],
  declarations: [MainComponent],
})
export class MainvestModule { }
