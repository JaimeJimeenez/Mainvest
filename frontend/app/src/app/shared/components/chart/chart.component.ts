import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartAsset, PredictedChart } from 'src/app/core/interfaces/chart';
import { Chart } from 'src/app/core/libs/chart';
import { ChartObservableService } from 'src/app/core/services/observables/chart-observable.service';
import { ChartPredictedObservableService } from 'src/app/core/services/observables/chart-predicted-observable.service';

@Component({
  selector: 'mainvest-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() assetsChart: ChartAsset[] = [];

  constructor(private chartObservable: ChartObservableService, private predictedObservable: ChartPredictedObservableService) {
    this.chartObservable.chartAsset$.subscribe((data: ChartAsset[]) => {
      this.assetsChart = data;
      this._drawChart();
    });
    this.predictedObservable.predictionChart$.subscribe((data: PredictedChart[]) => {
      this._drawPredictedChart(data);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assetsChart']) {
      this.assetsChart = changes['assetsChart'].currentValue;
      this._drawChart();
    }
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
