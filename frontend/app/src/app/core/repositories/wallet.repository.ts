import { Observable } from "rxjs";
import { Wallet } from "../interfaces/wallet";

export abstract class WalletRepository {
  abstract getWallets$(idUser: number): Observable<Wallet[]>
}
