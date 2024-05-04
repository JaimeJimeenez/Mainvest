import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Asset } from 'src/app/core/interfaces/market';
import { AssetTableLineComponent } from './asset-table-line/asset-table-line.component';

@Component({
  selector: 'mainvest-asset-table',
  standalone: true,
  imports: [CommonModule, AssetTableLineComponent],
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss']
})
export class AssetTableComponent {
  public columns: string[] = [
    'Ajd Close',
    'Close',
    'High',
    'Low',
    'Open',
    'Volume',
    'Date'
  ];

  @Input() asset: Asset[] = []
}
