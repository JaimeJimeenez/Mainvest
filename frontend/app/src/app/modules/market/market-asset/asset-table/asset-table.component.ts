import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Asset } from 'src/app/core/interfaces/market';
import { AssetTableLineComponent } from './asset-table-line/asset-table-line.component';
import { lastValueFrom } from 'rxjs';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';

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
  @Input() name: string = '';

  constructor(private marketRepository: MarketRepositoryImpl) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['asset']) {
      if (changes['asset'].currentValue.length == 1) {
        await this._getAssetsData();
      }
    }
  }

  private async _getAssetsData() {
    const data: Map<string, Asset[]> = await lastValueFrom(this.marketRepository.getAssetData$(this.name));
    this.asset = data.get(this.name)!.reverse().slice(0, 10);
  }
}
