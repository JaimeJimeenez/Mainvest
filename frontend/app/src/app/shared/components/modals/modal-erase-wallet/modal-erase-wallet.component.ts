import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wallet } from 'src/app/core/interfaces/wallet';
import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';
import { WalletRepositoryImpl } from 'src/app/infraestructure/data/repositories/wallet.repository.impl';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'mainvest-modal-erase-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-erase-wallet.component.html',
  styleUrls: ['./modal-erase-wallet.component.scss']
})
export class ModalEraseWalletComponent {
  @Input() wallet: Wallet = {
    id: 0,
    name: '',
    total_value: 0,
    assets: []
  }
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private userRepository: UserRepositoryImpl, private walletRepository: WalletRepositoryImpl) {}

  onCloseModal(): void {
    this.closeModal.emit(true);
  }

  async eraseWallet(): Promise<void> {
    try {
      await lastValueFrom(this.userRepository.updateMoney$(this.wallet.id, this.wallet.total_value));
      await lastValueFrom(this.walletRepository.eraseWallet$(this.wallet.id));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
