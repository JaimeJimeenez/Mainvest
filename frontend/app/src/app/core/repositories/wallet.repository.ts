import { Observable } from "rxjs";

import { Wallet, Asset } from "../interfaces/wallet";

export abstract class WalletRepository {
  abstract createWallet$(idUser: number, name: string): Observable<number>;
  abstract addAssets$(assets: Asset[]): Observable<number[]>;
  abstract getWallets$(idUser: number): Observable<Wallet[]>;
  abstract assignAssetsToWallet$(idsWalletAssets: number[]): Observable<boolean>;
  abstract updateWalletAssets$(idAsset: number, amount: number): Observable<boolean>;
  abstract eraseWallet$(id: number): Observable<boolean>;
}
