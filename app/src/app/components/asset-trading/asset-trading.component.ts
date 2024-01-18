import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AssetBuyComponent } from './asset-buy/asset-buy.component';
import { AssetSellComponent } from './asset-sell/asset-sell.component';
import { CardMoneyComponent } from '../card-money/card-money.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CardMoneyComponent,
    AssetBuyComponent,
    AssetSellComponent
  ],
  selector: 'mainvest-asset-trading',
  templateUrl: './asset-trading.component.html',
  styleUrls: ['./asset-trading.component.scss']
})
export class AssetTradingComponent {
  @Input() wallets : any[] = [];
  @Input() walletsByAsset : any[] = [];
  @Input() close : number = 0;

  isBuyingAsset : boolean = true;
  isNewWallet : boolean = true;

  onNewWallet(isNewWallet : boolean) : void {
    this.isBuyingAsset = true;
    this.isNewWallet = isNewWallet;
    this.onSelectTradingOptions(true);
  }

  onSelectTradingOptions(isBuying : boolean) : void {
    this.isBuyingAsset = isBuying;
    this._updateTradingOption();
  }

  private _updateTradingOption() : void {
    let element : Element;
    const containerFather = document.querySelector('.asset--trading--options');
    const containers = containerFather?.querySelectorAll('.asset--trading--options--buy, .asset--trading--options--sell');
    containers?.forEach((element) => element.classList.remove('trading--selected'));

    if (this.isBuyingAsset)
      element = document.getElementsByClassName('asset--trading--options--buy')[0];
    else
      element = document.getElementsByClassName('asset--trading--options--sell')[0];

    if (element)
      element.classList.add('trading--selected');
  }
}
