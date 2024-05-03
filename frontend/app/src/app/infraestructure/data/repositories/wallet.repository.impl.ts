import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Wallet } from "src/app/core/interfaces/wallet";
import { WalletRepository } from "src/app/core/repositories/wallet.repository";
import { WalletService } from "src/app/core/services/wallet.service";

@Injectable({
  providedIn: 'root'
})
export class WalletRepositoryImpl extends WalletRepository{

  constructor(private wallet: WalletService) {
    super();
  }

  override getWallets$(idUser: number): Observable<Wallet[]> {
    try {
      return this.wallet.getWallets$(idUser);
    } catch (error) {
      throw error;
    }
  }

}
