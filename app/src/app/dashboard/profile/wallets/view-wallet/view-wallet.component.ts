import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ASSETS } from 'src/app/const/financial_assets';
import { IAsset } from 'src/app/interface/financial/iAssets';
import { IWallet, IAssetWallet } from 'src/app/interface/financial/iWallet';
import { FinancialAsset } from 'src/app/lib/financial_asset';
import { DateService } from 'src/app/service/common/date.service';
import { FinancialAssetsDataService } from 'src/app/service/requests/common/financial-assets-data.service';
import { WalletService } from 'src/app/service/wallet/wallet.service';

@Component({
  selector: 'mainvest-view-wallet',
  templateUrl: './view-wallet.component.html',
  styleUrls: ['./view-wallet.component.scss']
})
export class ViewWalletComponent {
  private idWallet : string | null = '';

  public assetsMap : Map<string, IAsset> = new Map<string, IAsset>();
  public assetsValues : number[] = [];
  public wallet : IWallet = {
    id : -1,
    name: '',
    assets: [],
  }

  constructor(
    private route : ActivatedRoute,
    private wallets : WalletService,
    private date : DateService,
    private financialAssetsData : FinancialAssetsDataService
  ) {

    this._getFinancialAssets();
  }

  ngOnInit() : void {
    this.route.paramMap.subscribe(async (params) => {
      this.idWallet = params.get('id');
      const { id, name } = await firstValueFrom(this.wallets.getWalletName(+this.idWallet!));
      const assets = await firstValueFrom(this.wallets.getAssetsByWallet(+this.idWallet!));
      this.wallet = {
        id,
        name,
        assets : this._parseAssets(assets),
      }
      this._parseAssets(assets);
    });
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
    this._assignAssetsValues();
  }

  private _assignAssetsValues() : void {
    const { assets } = this.wallet;
    assets.forEach((row : IAssetWallet) => {
      const value = FinancialAsset.getTotalSharesOfAsset(this.assetsMap.get(row.name)?.adj_close!, row.amount);
      this.assetsValues.push(value);
    })
  }

  private _parseAssets(assets : any[]) : IAssetWallet[] {
    const assetsList : IAssetWallet[] = [];
    assets.forEach((asset) => assetsList.push({ name : asset.name, amount : asset.amount}));
    return assetsList;
  }
}
