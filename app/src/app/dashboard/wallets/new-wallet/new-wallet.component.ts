import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { ASSETS } from 'src/app/const/financial_assets';
import { IAsset } from 'src/app/interface/financial/iAssets';
import { IAssetWallet, IWallet } from 'src/app/interface/financial/iWallet';
import { FinancialAsset } from 'src/app/lib/financial_asset';

import { DateService } from 'src/app/service/common/date.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'mainvest-new-wallet',
  templateUrl: './new-wallet.component.html',
  styleUrls: ['./new-wallet.component.scss']
})
export class NewWalletComponent {
  private _numberOfAssets : number = 0;
  private _moneyUser : number = 0;
  private _assetsIndex : Map<string, number> = new Map<string, number>();

  public newWalletForm : FormGroup;
  public showAlert : boolean = false;
  public assetsMap : Map<string, IAsset>;
  public optionsAsset : string[][] = [];

  public assetsValues : number[] = new Array<number>(ASSETS.length);
  public purchasedShares : number[] = [];
  public selectedAssets : string[] = [];

  constructor(
    private financialAssetsData : FinancialAssetsDataService,
    private date : DateService,
    private wallet : WalletService,
    private router : Router
  ) {
    this.newWalletForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      assets : new FormArray([]),
    });
    this.assetsMap = new Map<string, IAsset>();
    this._getFinancialAssets();
    this._getMoneyUsers();
  }

  private _getMoneyUsers() : void {
    const user : any = localStorage.getItem('user');
    const { money } = JSON.parse(user);
    this._moneyUser = money;
  }

  private _createNewFormGroup(assetName : string) : FormGroup {
    const newFormGroup = new FormGroup({
      assetName : new FormControl(assetName, [Validators.required],),
      assetValue : new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d*$/)]),
    });

    return newFormGroup;
  }

  private async _getFinancialAssets() : Promise<void> {
    const { firstDay, lastDay } = this.date.getDays();
    const dataAssets =
      await firstValueFrom(this.financialAssetsData.getFinancialAssets(
        ASSETS,
        firstDay,
        lastDay
      ));
    this.assetsMap = FinancialAsset.getAverageFinancialAssetsData(dataAssets);
  }

  private _suscribeNewAsset(index : number) : void {
    const control = this.assets.at(index) as FormGroup;
    const assetValue = control?.get('assetValue') as FormControl;
    const assetName = control?.get('assetName') as FormControl;
    assetValue.valueChanges.subscribe((value) => {
      const indexAsset = this._assetsIndex.get(assetName.value);
      if (indexAsset !== undefined)
        this.purchasedShares[indexAsset] =
          FinancialAsset.getTotalSharesOfAsset(this.assetsValues[indexAsset], value);
      const total = this.purchasedShares.reduce((a, b) => a + b, 0);
      this.showAlert = this._moneyUser < total;
    })
  }

  private _getCostOfShares(index : number) : void {
    const assetName = this.assets.at(index).value.assetName;
    const assetValue = this.assets.at(index).value.assetValue;
    const costOfAsset = this._getFinancialAssetValue(assetName);
    this.purchasedShares[index] =
      FinancialAsset.getTotalSharesOfAsset(costOfAsset, assetValue);
  }

  private _addNewAsset() : void {
    const assetName = FinancialAsset.getFirstSelectAssetOption(this.selectedAssets);
    const newAsset = this._createNewFormGroup(assetName);
    this.selectedAssets.push(assetName);
    this.optionsAsset = FinancialAsset.fillOptionsAssets(this.selectedAssets);
    this.assets.push(newAsset);
    this._suscribeNewAsset(this.assets.length - 1);
  }

  private _getFinancialAssetValue(assetName : string): number {
    const asset : IAsset | undefined =
      this.assetsMap.get(assetName) || undefined;
    return asset !== undefined ? asset.adj_close : -1;
  }

  private _updateAssetsIndexMap(index : number, assetName : string) : void {
    this._assetsIndex.delete(assetName);
    const arrayIndexAsset = Array.from(this._assetsIndex.entries()).slice(index);
    const othersIndexAsset = Array.from(this._assetsIndex.entries()).slice(0, index);
    for (let i = index; i < arrayIndexAsset.length; i++) {
      arrayIndexAsset[i][1] = arrayIndexAsset[i][1] - 1;
    };
    this._assetsIndex = new Map<string, number>([...othersIndexAsset, ...arrayIndexAsset]);
  }

  private _createWallet(name : string, assets : any[]) : IWallet {
    const newWallet : IWallet = {
      name,
      assets : []
    };

    assets.forEach((asset : any) => {
      const { assetName, assetValue } = asset;
      const newAsset : IAssetWallet = {
        name : assetName,
        amount : assetValue,
      }
      newWallet.assets.push(newAsset);
    });

    return newWallet;
  }

  async onNewFinancialAsset() : Promise<void> {
    if (this.assets.length === ASSETS.length) return;
    this._numberOfAssets++;
    this._addNewAsset();
    this.purchasedShares.push(0);

    const assetName = this.selectedAssets[this._numberOfAssets - 1];
    this._assetsIndex.set(assetName, this._numberOfAssets - 1);
    const asset = this._getFinancialAssetValue(assetName);
    this.assetsValues[this._numberOfAssets - 1] = asset;
  }

  onSelectChange($event : Event, index : number) : void {
    const assetName = ($event.target as HTMLSelectElement).value;
    this.selectedAssets[index] = assetName;
    this.optionsAsset = FinancialAsset.fillOptionsAssets(this.selectedAssets);
    const assetValue = this._getFinancialAssetValue(assetName);
    this.assetsValues[index] = assetValue;
    this._assetsIndex.delete(assetName);
    this._assetsIndex.set(assetName, index);
    this._getCostOfShares(index);
  }

  get assets() {
    return this.newWalletForm.get('assets') as FormArray;
  }

  onRemoveAsset(index : number) : void {
    const assetRemoved = this.selectedAssets[index];
    this._numberOfAssets--;
    this.assets.removeAt(index);
    this.optionsAsset.splice(index, 1);
    this.selectedAssets.splice(index, 1);
    this.optionsAsset.forEach((options : string[]) => options.push(assetRemoved));
    this.purchasedShares.splice(index, 1);
    this.assetsValues.splice(index, 1);
    this._updateAssetsIndexMap(index, assetRemoved);
  }

  onSubmit() : void {
    const { name, assets } = this.newWalletForm.controls;
    const newWallet : IWallet = this._createWallet(name.value, assets.value);
    const user : any = localStorage.getItem('user');
    const { id } = JSON.parse(user);

    this.wallet.createWallet(id, newWallet.name)
      .then((idWallet : number) => {
        const hasAssets = newWallet.assets.length !== 0;
        if (hasAssets)
          this.wallet.addAssets(idWallet, newWallet.assets)
            .then((response : boolean) => {
              if (response)
                this.router.navigate(['/dashboard/profile/wallets']);
              else console.log('Todo mal');
            });
        else
            this.router.navigate(['/dashboard/profile/wallets']);
      }
    );
  }
}
