import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";

import { Alert } from "src/app/core/interfaces/alert";
import { AlertRepository } from "src/app/core/repositories/alert.repository";
import { AlertService } from "src/app/core/services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class AlertRepositoryImpl extends AlertRepository {


  constructor(private alert: AlertService) {
    super();
  }

  override addAlert$(idUser: number, name: string, price: number): Observable<boolean> {
    try {
      const alert: Alert = { idUser, name, price }
      return this.alert.addAlert$(alert);
    } catch (error) {
      throw error;
    }
  }

  override getUserAlerts$(idUser: number): Observable<Alert[]> {
    try {
      return this.alert.getUserAlerts$(idUser);
    } catch (error) {
      throw error;
    }
  }

  override deleteAlert$(id: number): Observable<boolean> {
    try {
      return this.alert.deleteAlert$(id);
    } catch (error) {
      throw error;
    }
  }
}
