import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRepositoryImpl } from 'src/app/infraestructure/external/market.repository.impl';
import { lastValueFrom } from 'rxjs';
import { ChartObservableService } from 'src/app/core/services/observables/chart-observable.service';
import { ChartAsset } from 'src/app/core/interfaces/chart';
import { Market } from 'src/app/core/libs/market';

@Component({
  selector: 'mainvest-prediction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent {
  @Input() asset: string = '';
  public isLoading: boolean = false;

  constructor(private marketRepository: MarketRepositoryImpl, private chartObservable: ChartObservableService) {}

  async ngOnInit() {
    this.isLoading = true
    const data: ChartAsset[] = await lastValueFrom(this.marketRepository.getPrediction$(this.asset));
    const cleanData: ChartAsset[] = Market.getPredictionData(data);
    this.chartObservable.sendDataChart(cleanData);
    this.isLoading = false;
  }
}
