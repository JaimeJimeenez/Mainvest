import { AlertDTO } from "src/app/infraestructure/dto/alert.dto";
import { Alert } from "../interfaces/alert";

export class AlertMapper {
  public static fromAPIToDomain(alertsDTO: AlertDTO[]): Alert[] {
    return alertsDTO.map((alert: AlertDTO) => ({
      id: alert.id,
      idUser: alert.id_user,
      name: alert.asset,
      price: alert.price
    }));
  }
}
