import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IAlert } from 'src/app/interface/alert/alert';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AlertsEraseDataService } from 'src/app/service/requests/alert/alerts-erase-data.service';
import { AlertsListDataService } from 'src/app/service/requests/alert/alerts-list-data.service';

@Component({
  selector: 'mainvest-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListComponent {
  private idUser : number = 0;
  private options : boolean[] = [false, true];
  private _alertsData : IAlert[] = [];

  public alerts : IAlert[] = [];
  public isComment : boolean = true;

  constructor(
    private activatedRoute : ActivatedRoute,
    private alert : AlertService
  ) {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      this.idUser = +params.get('id')!;
      this._alertsData = await lastValueFrom(this.alert.getAlerts(this.idUser));
      this._filterAlerts(0);
      console.log(this.alerts);
    });
  }

  private _updateSubmenu(selected : number) : void {
    const options = document.getElementsByClassName('list--options')[0];
    if (options) {
      const elements = options.querySelectorAll('div')
      elements.forEach((element) => element.classList.remove('selected'));
      const element : Element = elements[selected];
      if (element)
        element.classList.add('selected');
    }
  }

  private _filterAlerts(selected : number) : void {
    this.alerts = this._alertsData.filter((alert : IAlert) => alert.liked == this.options[selected]);
  }

  onSelectedOption(selected : number) : void {
    this._updateSubmenu(selected);
    this._filterAlerts(selected);
    this.isComment = !this.alerts[0].liked;
  }

  eraseAlert(idAlert : number) : void {

  }
}
