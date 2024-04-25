import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';
import { ASSETS } from 'src/app/const/asset';
import { lastValueFrom } from 'rxjs';
import { Asset, AssetData } from 'src/app/core/interfaces/market';
import { TableComponent } from './table/table.component';
import { Market } from 'src/app/core/libs/market';

@Component({
  selector: 'mainvest-market-home',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './market-home.component.html',
  styleUrls: ['./market-home.component.scss']
})
export class MarketHomeComponent {
  public assets: AssetData[] = [];

  constructor(private marketRespository: MarketRepositoryImpl) {}

  async ngOnInit() {
    const todayAssets: Map<string, Asset[]> = await lastValueFrom(this.marketRespository.getTodayAssetsData$(ASSETS));
    const yesterdayAssets: Map<string, Asset[]> = await lastValueFrom(this.marketRespository.getYesterdayAssetsData$(ASSETS));
    this.assets = Market.getAssetsData(todayAssets, yesterdayAssets, ASSETS);
  }
}
