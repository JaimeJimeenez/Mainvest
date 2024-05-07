import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Wallet } from 'src/app/core/interfaces/wallet';

@Component({
  selector: 'mainvest-dropdown-wallets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-wallet.component.html',
  styleUrls: ['./dropdown-wallet.component.scss']
})
export class DropdownWalletsComponent {
  @Input() wallets: Wallet[] = [];
  @Output() selectedWallet: EventEmitter<number> = new EventEmitter<number>();

  public wallet: string = 'Seleccionar cartera';

  onSelectedWallet(index: number): void {
    this.wallet = this.wallets[index].name;
    this.selectedWallet.emit(index);
  }
}
