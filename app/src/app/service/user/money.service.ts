import { Injectable } from '@angular/core';
import { AddMoneyDataService } from '../requests/user/add-money-data.service';
import { Observable } from 'rxjs';
import { GetMoneyDataService } from '../requests/user/get-money-data.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(private addMoneyData : AddMoneyDataService, private getMoneyUser : GetMoneyDataService) { }

  getMoney(idUser : number) : Observable<number> {
    return this.getMoneyUser.getMoney(idUser);
  }

  addMoney(money : number, idUser : number) : Observable<boolean> {
    return this.addMoneyData.addMoney(money, idUser);
  }
}
