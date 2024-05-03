import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { WalletLib } from 'src/app/core/libs/wallet';

@Component({
  selector: 'mainvest-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  @Input() wallet: Wallet = {
    id: 0,
    name: '',
    total_value: 0,
    assets: []
  }
  @Input() assets: Map<string, number> = new Map<string, number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assets']) {
      this.assets = changes['assets'].currentValue;
    }
    if (changes['wallet']) {
      this.wallet = changes['wallet'].currentValue;
    }
    this.wallet.total_value = WalletLib.calculateTotalCost(this.assets, this.wallet.assets);
  }

  async onEraseWallet(): Promise<void> {
    try {
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
