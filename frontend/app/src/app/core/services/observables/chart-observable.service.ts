import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChartAsset } from '../../interfaces/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartObservableService {

  private _subject = new Subject<ChartAsset[]>();
  chartAsset$ = this._subject.asObservable();

  sendDataChart(chartData: ChartAsset[]): void {
    this._subject.next(chartData);
  }
}
