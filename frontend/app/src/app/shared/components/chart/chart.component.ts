import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartAsset } from 'src/app/core/interfaces/chart';
import { Chart } from 'src/app/core/libs/chart';
import { ChartObservableService } from 'src/app/core/services/observables/chart-observable.service';

@Component({
  selector: 'mainvest-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() assetsChart: ChartAsset[] = [];

  constructor(private chartObservable: ChartObservableService) {
    this.chartObservable.chartAsset$.subscribe((data: ChartAsset[]) => {
      this.assetsChart = data;
      this._drawChart();
    })
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
}
