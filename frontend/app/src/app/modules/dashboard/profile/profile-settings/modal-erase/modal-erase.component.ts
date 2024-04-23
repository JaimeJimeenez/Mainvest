import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';

@Component({
  standalone: true,
  selector: 'mainvest-modal-erase',
  templateUrl: './modal-erase.component.html',
  styleUrls: ['./modal-erase.component.scss']
})
export class ModalEraseComponent {
  @Input() idUser: number = 0;

  constructor(private userRepository: UserRepositoryImpl) {}

  eraseUser() {
    try {
      this.userRepository.eraseUser(this.idUser);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
