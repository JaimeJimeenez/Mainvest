import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { numericalValidator } from 'src/app/core/validator/numerical.validator';
import { AlertRepositoryImpl } from 'src/app/infraestructure/data/repositories/alert.repository.impl';
import { LocalStorage } from 'src/app/core/libs/local.storage';
import { User } from 'src/app/core/interfaces/user';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'mainvest-modal-alert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent {
  @Input() asset: string = '';
  public alertForm: FormGroup;

  constructor(private alertRepository: AlertRepositoryImpl) {
    this.alertForm = new FormGroup({
      price: new FormControl('', [Validators.required, numericalValidator()])
    });
  }

  async onSubmit(): Promise<void> {
    const { price } = this.alertForm.value;
    const user: User | undefined = LocalStorage.getUser();
    if (user !== undefined) {
      await lastValueFrom(this.alertRepository.addAlert$(user.id, this.asset, price));
    }
  }
}
