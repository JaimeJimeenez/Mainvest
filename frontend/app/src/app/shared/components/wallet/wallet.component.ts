import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { WalletLib } from 'src/app/core/libs/wallet';
import { ModalEraseWalletComponent } from '../modals/modal-erase-wallet/modal-erase-wallet.component';

@Component({
  selector: 'mainvest-wallet',
  standalone: true,
  imports: [CommonModule, ModalEraseWalletComponent],
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

  public isModalOpen: boolean = false;

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

  openModal(): void {
    this.isModalOpen = true;
  }

  onCloseModal(isModalOpen: boolean): void {
    this.isModalOpen = false;
  }
}
