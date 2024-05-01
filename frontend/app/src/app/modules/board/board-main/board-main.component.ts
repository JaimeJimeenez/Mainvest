import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { BoardNavComponent } from '../board-nav/board-nav.component';

@Component({
  selector: 'mainvest-board-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BoardNavComponent],
  templateUrl: './board-main.component.html',
  styleUrls: ['./board-main.component.scss']
})
export class BoardMainComponent {

}
