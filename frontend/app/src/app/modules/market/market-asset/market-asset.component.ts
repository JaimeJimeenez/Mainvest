import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { ChartAsset } from 'src/app/core/interfaces/chart';
import { Asset } from 'src/app/core/interfaces/market';
import { Market } from 'src/app/core/libs/market';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { AssetOptionsComponent } from './asset-options/asset-options.component';

@Component({
  selector: 'mainvest-market-asset',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
    AssetTableComponent,
    AssetOptionsComponent
  ],
  templateUrl: './market-asset.component.html',
  styleUrls: ['./market-asset.component.scss']
})
export class MarketAssetComponent {
  public asset: string = '';
  public assets: Asset[] = []
  public assetsChart: ChartAsset[] = [];

  constructor(private route: ActivatedRoute, private marketRepository: MarketRepositoryImpl) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const name: string = params.get('name')!;
      this.asset = name;
      this._getAssetsData();
    });
  }

  private async _getAssetsData() {
    const data: Map<string, Asset[]> = await lastValueFrom(this.marketRepository.getAssetData$(this.asset));
    this.assets = data.get(this.asset)!.reverse().slice(0, 10);
    this.assetsChart = Market.getChartAssets(data.get(this.asset)!).reverse();
  }

  onUpdateTime(option: number): void {
    if (option === 1) {
      this._getAssetsData();
    } else {
      this.assetsChart = this.assetsChart.slice(this.assetsChart.length - 31, undefined);
    }
  }
}
