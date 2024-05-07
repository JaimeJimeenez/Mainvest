import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { NewWallet, Wallet, Asset, UpdateWallet } from "src/app/core/interfaces/wallet";
import { WalletRepository } from "src/app/core/repositories/wallet.repository";
import { WalletService } from "src/app/core/services/wallet.service";

@Injectable({
  providedIn: 'root'
})
export class WalletRepositoryImpl extends WalletRepository{

  constructor(private wallet: WalletService) {
    super();
  }

  override createWallet$(idUser: number, name: string): Observable<number> {
    try {
      const newWallet: NewWallet = { idUser, name };
      return this.wallet.createWallet$(newWallet);
    } catch (error) {
      throw error;
    }
  }

  override addAssets$(assets: Asset[]): Observable<number[]> {
    try {
      return this.wallet.addAssets$(assets);
    } catch (error) {
      throw error;
    }
  }

  override getWallets$(idUser: number): Observable<Wallet[]> {
    try {
      return this.wallet.getWallets$(idUser);
    } catch (error) {
      throw error;
    }
  }

  override assignAssetsToWallet$(idsWalletAssets: number[]): Observable<boolean> {
    try {
      return this.wallet.assignAssetsToWallet$(idsWalletAssets);
    } catch (error) {
      throw error;
    }
  }

  override updateWalletAssets$(idAsset: number, amount: number): Observable<boolean> {
    try {
      const updateWallet: UpdateWallet = { idAsset, amount };
      return this.wallet.updateWalletAssets$(updateWallet);
    } catch (error) {
      throw error;
    }
  }

  override eraseWallet$(id: number): Observable<boolean> {
    try {
      return this.wallet.eraseWallet$(id);
    } catch (error) {
      throw error;
    }
  }
}
