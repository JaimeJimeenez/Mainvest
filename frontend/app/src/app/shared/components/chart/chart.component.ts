import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartAsset, PredictedChart } from 'src/app/core/interfaces/chart';
import { Chart } from 'src/app/core/libs/chart';
import { ChartObservableService } from 'src/app/core/services/observables/chart-observable.service';
import { ChartPredictedObservableService } from 'src/app/core/services/observables/chart-predicted-observable.service';
import { Asset } from 'src/app/core/interfaces/market';
import { lastValueFrom } from 'rxjs';
import { Market } from 'src/app/core/libs/market';
import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';

@Component({
  selector: 'mainvest-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() assetsChart: ChartAsset[] = [];
  @Input() asset: string = '';

  constructor(private chartObservable: ChartObservableService, private predictedObservable: ChartPredictedObservableService, private marketRepository: MarketRepositoryImpl) {
    this.chartObservable.chartAsset$.subscribe((data: ChartAsset[]) => {
      this.assetsChart = data;
      this._drawChart();
    });
    this.predictedObservable.predictionChart$.subscribe((data: PredictedChart[]) => {
      this._drawPredictedChart(data);
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['assetsChart']) {
      if (changes['assetsChart'].currentValue.length == 1) {
        await this._getAssetsData();
      } else {
        this.assetsChart = changes['assetsChart'].currentValue;
      }
      this._drawChart();
    }
  }

  private async _getAssetsData() {
    const data: Map<string, Asset[]> = await lastValueFrom(this.marketRepository.getAssetData$(this.asset));
    this.assetsChart = Market.getChartAssets(data.get(this.asset)!);
  }

  private _drawChart() : void {
    const element = document.getElementById('asset--chart');
    const chartContainer = document.getElementsByClassName(
      'asset--chart'
    )[0];
    while (chartContainer.firstChild)
      chartContainer.removeChild(chartContainer.firstChild);
    Chart.drawChart(this.assetsChart, element!);
  }

  private _drawPredictedChart(data: PredictedChart[]): void {
    const element = document.getElementById('asset--chart');
    const chartContainer = document.getElementsByClassName(
      'asset--chart'
    )[0];
    while (chartContainer.firstChild)
      chartContainer.removeChild(chartContainer.firstChild);
    Chart.drawPredictChart(data, element!);
  }
}
