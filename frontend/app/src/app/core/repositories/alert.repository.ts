import { Observable } from "rxjs";
import { Alert } from "../interfaces/alert";

export abstract class AlertRepository {
  abstract addAlert$(idUser: number, name: string, amount: number): Observable<boolean>;
  abstract getUserAlerts$(idUser: number): Observable<Alert[]>;
  abstract deleteAlert$(id: number): Observable<boolean>;
}
