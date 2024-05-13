import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PredictedChart } from '../../interfaces/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartPredictedObservableService {

  private _subject = new Subject<PredictedChart[]>();
  predictionChart$ = this._subject.asObservable()

  sendPredictedChart(predictedChart: PredictedChart[]): void {
    this._subject.next(predictedChart);
  }
}
