import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AssetBuyExistComponent } from './asset-buy-exist/asset-buy-exist.component';
import { AssetBuyNewComponent } from './asset-buy-new/asset-buy-new.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AssetBuyExistComponent,
    AssetBuyNewComponent
  ],
  selector: 'mainvest-asset-buy',
  templateUrl: './asset-buy.component.html',
  styleUrls: ['./asset-buy.component.scss']
})
export class AssetBuyComponent {
  @Input() newWallet : boolean = true;
  @Input() wallets : any[] = [];
  @Input() close : number = 0;
}
