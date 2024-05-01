import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { SubmenuModel } from 'src/app/core/models/submenu.model';
import { BoardRepositoryImpl } from 'src/app/infraestructure/data/repositories/board.repository.impl';

@NgModule({
  declarations: [],
  imports: [CommonModule, BoardRoutingModule],
  providers: [SubmenuModel, BoardRepositoryImpl]
})
export class BoardModule { }
