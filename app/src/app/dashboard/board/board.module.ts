import { NgModule } from '@angular/core';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';

@NgModule({
  imports: [ BoardRoutingModule ],
  exports: [ BoardComponent ],
  declarations: [ BoardComponent ],
})
export class BoardModule { }
