import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { TableLineComponent } from 'src/app/shared/components/table-line/table-line.component';

import { AssetData } from 'src/app/core/interfaces/market';

@Component({
  standalone: true,
  selector: 'mainvest-market-home-table',
  imports: [CommonModule, TableLineComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() assets: AssetData[] = [];
}
