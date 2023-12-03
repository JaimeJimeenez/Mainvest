import { Injectable } from '@angular/core';
import { AddMoneyDataService } from '../requests/user/add-money-data.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(private addMoneyData : AddMoneyDataService) { }

  addMoney(money : number, idUser : number) : Promise<boolean> {
    return this.addMoneyData.addMoney(money, idUser);
  }
}
