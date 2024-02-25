import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, distinctUntilChanged, lastValueFrom, take } from 'rxjs';

import { IChart, IPredictedChart } from 'src/app/interface/financial/iChart';
import { FinancialAsset } from 'src/app/lib/financial_asset';
import { AlertService } from 'src/app/service/alert/alert.service';
import { ChartService } from 'src/app/service/charts/chart.service';
import { DateService } from 'src/app/service/common/date.service';
import { MoneyObservableService } from 'src/app/service/observables/money-observable.service';
import { TradingObservableService } from 'src/app/service/observables/trading-observable.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';
import { PredictionDataService } from 'src/app/service/requests/common/prediction-data.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'mainvest-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent {
  private _idUser : number = 0;
  private _predictedChartData : any;
  private _subscriptionTrading : Subscription;

  name : string | null = '';
  chartData : IChart[] = [];
  showYears : boolean = true;
  isBuyingAsset : boolean = true;
  wallets : any[] = [];
  walletsByAsset : any;
  closePrice : number = 0;
  options : boolean[] = [true, false, false];
  predictedValue : number = 0;
  alertForm : FormGroup;
  isButtonDisabled : boolean = false;
  showError : boolean = false;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private financialAssetData : FinancialAssetsDataService,
    private date : DateService,
    private chart : ChartService,
    private wallet : WalletService,
    private moneyObservable : MoneyObservableService,
    private tradingObservable : TradingObservableService,
    private predictionData : PredictionDataService,
    private alerts : AlertService
  ) {
    this.activatedRoute.paramMap.subscribe((params => {
      this.name = params.get('name');
      this._getAssetValues();
      this._getIdUser();
      this._getWallets();
      this._getWalletsWithAsset();
    }));

    this._subscriptionTrading = this.tradingObservable.tradingData$.pipe(take(1)).subscribe(
      async (tradingInfo : any) => {
        const { isBuying, amount } = tradingInfo;
        if (isBuying) {
          const money = FinancialAsset.getTotalSharesOfAsset(this.closePrice, amount);
          this._updateUserMoney(money, true);
          await this.wallet.buyAsset(this._idUser, { ...tradingInfo, asset : this.name, money });
        }
        else {
          const money = FinancialAsset.getTotalMoneyOfAsset(this.closePrice, amount);
          this._updateUserMoney(money, false);
          await lastValueFrom(this.wallet.sellAsset({ ...tradingInfo, asset : this.name }, money, this._idUser));
        }
        this.router.navigate([`/dashboard/market`]);
      });

      this.alertForm = new FormGroup({
        price : new FormControl('', [Validators.required, Validators.min(0)])
      });
      this.alertForm.get('amount')?.valueChanges.subscribe((value) => {
        this.isButtonDisabled = isNaN(value);
        this.showError = this.isButtonDisabled;
      });
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
    this.closePrice = this.chartData[this.chartData.length - 1].close;
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
    const containers = containerFather?.querySelectorAll('.asset--options--history, .asset--options--prediction, .asset--options--trading');
    containers?.forEach((element) => element.classList.remove('option--selected'));

    if (this.options[0])
      element = document.getElementsByClassName('asset--options--history')[0];
    else if (this.options[1])
      element = document.getElementsByClassName('asset--options--prediction')[0];
    else
      element = document.getElementsByClassName('asset--options--trading')[0];

    if (element)
      element.classList.add('option--selected');
  }

  private _updateUserMoney(money : number, isBuying : boolean) : void {
    const storedData : any = localStorage.getItem('user');
    const user = JSON.parse(storedData);
    let userMoney : number = +user['money'];

    if (isBuying)
      userMoney -= money;
    else
      userMoney += money;
    user['money'] = userMoney;

    localStorage.setItem('user', JSON.stringify(user));
    this.moneyObservable.updateMoney(user['money']);
  }

  private _getIdUser() : void {
    const user : any = localStorage.getItem('user');
    const { id } = JSON.parse(user);
    this._idUser = id;
  }

  private async _getWallets() {
    this.wallets = await lastValueFrom(this.wallet.getWallets(this._idUser));
  }

  private async _getWalletsWithAsset() {
    this.walletsByAsset = await lastValueFrom(this.wallet.getWalletsByAsset(this._idUser, this.name!));
  }

  private _drawPredictedChart() : void {
    const element = document.getElementById('asset--chart');
    const chartContainer = document.getElementsByClassName(
      'asset--chart'
    )[0];
    while (chartContainer.firstChild)
      chartContainer.removeChild(chartContainer.firstChild);
    this.chart.drawPredictChart(this._predictedChartData, element!);
  }

  private async _getPrediction() {
    const { firstDate, lastDate } = this.date.getPredictedDate();
    const data = await lastValueFrom(this.predictionData.getPrediction(this.name!, firstDate, lastDate));
    const initialData = this._getChartPrediction(this.chartData);
    const predictedData = this._getChartPrediction(data.data);
    this._predictedChartData = predictedData;
    this.predictedValue = this._predictedChartData[this._predictedChartData.length - 1].value;
    this._drawPredictedChart();
  }

  private _getChartPrediction(data : any[]): IPredictedChart[] {
    const predictedData : IPredictedChart[] = [];
    data.forEach((element) => {
      predictedData.push({
        value: element['close'],
        time: element['time']
      })
    });
    return predictedData;
  }

  updateOptions(option : number) : void {
    this.options = this.options.map((option : boolean) => option = false);
    this.options[option] = true;
    this._updateSelectOption();
    if (option == 1)
      this._getPrediction();
  }

  updateTimeChart(showYear : boolean) : void {
    if (this.showYears !== showYear) {
      this.showYears = showYear;
      this._getAssetValues();
      this._updateSelectTime();
    }
  }

  async onAddAlert() {
    const { price } = this.alertForm.value;
    const response = await lastValueFrom(this.alerts.addAlertPrice(this._idUser, this.name!, price));
    this.router.navigate([`/dashboard/market/`]);
  }

  ngOnDestroy() {
    this._subscriptionTrading.unsubscribe();
  }
}
