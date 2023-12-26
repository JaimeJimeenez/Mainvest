import { Injectable } from '@angular/core';
import { Observable, first, firstValueFrom } from 'rxjs';
import { EraseAssetDataService } from '../requests/asset/erase-asset-data.service';
import { ModifyAssetDataService } from '../requests/asset/modify-asset-data.service';
import { MoneyService } from '../user/money.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(
    private money : MoneyService,
    private modifyAssetData : ModifyAssetDataService,
    private eraseAssetData : EraseAssetDataService
  ) { }

  modifyAsset(idWallet : number, name : string, amount : number) : Observable<boolean> {
    return this.modifyAssetData.modifyAsset(idWallet, name, amount);
  }

  eraseAsset(idWallet : number, name : string, value : number, idUser : number) : Observable<boolean> {
    (async () => {
      const addedMoneyToUser = await firstValueFrom(this.money.addMoney(value, idUser));
    })();
    return this.eraseAssetData.eraseAsset(idWallet, name);
  }
}
