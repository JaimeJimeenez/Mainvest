import { Injectable } from '@angular/core';
import { AddMoneyDataService } from '../requests/user/add-money-data.service';
import { Observable } from 'rxjs';
import { UpdateMoneyDataService } from '../requests/user/update-money-data.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(private addMoneyData : AddMoneyDataService, private updateMoneyData : UpdateMoneyDataService) { }

  addMoney(money : number, idUser : number) : Observable<boolean> {
    return this.addMoneyData.addMoney(money, idUser);
  }

  updateMoney(idUser : number, money : number) : Observable<boolean> {
    return this.updateMoneyData.updateMoney(idUser, money)
  }
}
