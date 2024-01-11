import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { last, lastValueFrom } from 'rxjs';

import { IChart } from 'src/app/interface/financial/iChart';
import { FinancialAsset } from 'src/app/lib/financial_asset';
import { ChartService } from 'src/app/service/charts/chart.service';
import { DateService } from 'src/app/service/common/date.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';

@Component({
  selector: 'mainvest-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent {
  name : string | null = '';
  chartData : IChart[] = [];
  showYears : boolean = true;
  showHistoricalData : boolean = true;

  constructor(
    private activatedRoute : ActivatedRoute,
    private financialAssetData : FinancialAssetsDataService,
    private date : DateService,
    private chart : ChartService
  ) {
    this.activatedRoute.paramMap.subscribe((params => {
      this.name = params.get('name');
      this._getAssetValues();
    }));
  }

  private _getDates() :
    { pastMonth : string, actualMonth : string } |
    { pastYear : string, actualYear : string }
  {
    return this.showYears ? this.date.getYears() : this.date.getMonths();
  }

  private async _getAssetValues() {
    const date : any = this._getDates();
    const keys = Object.keys(date);
    const pastDate = date[keys[0]];
    const actualDate = date[keys[1]];

    const dataAssets = await lastValueFrom(this.financialAssetData.getFinancialAssets(
      [this.name!],
      pastDate,
      actualDate
    ));
    const { index, data } = dataAssets;
    this.chartData = [];

    index.forEach((value : string, i : number) => {
      const date = this.date.parseDate(value);
      this.chartData.push(FinancialAsset.getChartData(date, data[i]))
    });

    this._drawChart();
  }

  private _drawChart() : void {
    const element = document.getElementById('asset--chart');
    const chartContainer = document.getElementsByClassName(
      'asset--chart'
    )[0];
    while (chartContainer.firstChild)
      chartContainer.removeChild(chartContainer.firstChild);
    this.chart.drawChart(this.chartData, element!);
  }

  private _updateSelectTime() : void {
    let element : Element;
    const containerFather = document.querySelector('.asset--menu--options--time');
    const containers = containerFather?.querySelectorAll('.asset--time--month, .asset--time--year');
    containers?.forEach((element) => element.classList.remove('selected'));

    if (this.showYears)
      element = document.getElementsByClassName('asset--time--year')[0];
    else
      element = document.getElementsByClassName('asset--time--month')[0];
    if (element)
      element.classList.add('selected');
  }

  private _updateSelectOption() : void {
    let element : Element;
    const containerFather = document.querySelector('.asset--menu--options--info');
    const containers = containerFather?.querySelectorAll('.asset--options--history, .asset--options--trading');
    containers?.forEach((element) => element.classList.remove('option--selected'));

    if (this.showHistoricalData)
      element = document.getElementsByClassName('asset--options--history')[0];
    else
      element = document.getElementsByClassName('asset--options--trading')[0];

    if (element)
      element.classList.add('option--selected');
  }

  showHistory(updated : boolean) : void {
    this.showHistoricalData = updated;
    this._updateSelectOption();
  }

  updateTimeChart(showYear : boolean) : void {
    if (this.showYears !== showYear) {
      this.showYears = showYear;
      this._getAssetValues();
      this._updateSelectTime();
    }
  }
}
