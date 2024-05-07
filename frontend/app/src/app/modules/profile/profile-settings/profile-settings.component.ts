import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { UpdateUserData } from 'src/app/core/interfaces/user';

import { UserIdObservableService } from 'src/app/core/services/observables/user-id-observable.service';
import { ModalEraseComponent } from './modal-erase/modal-erase.component';
import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';

@Component({
  selector: 'mainvest-profile-settings',
  standalone: true,
  imports: [CommonModule, ModalEraseComponent, ReactiveFormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {

  public idUser: number = 0;
  public settingsForm : FormGroup = new FormGroup({});
  public showAlert : boolean = false;
  public errorInfo : string = '';

  constructor(
    private route: ActivatedRoute,
    private userIdObservable: UserIdObservableService,
    private userRepository: UserRepositoryImpl
  ) {
    this.settingsForm = this._createFormGroup();
  }

  ngOnInit() {
    this.settingsForm.get('newPassword')?.valueChanges.subscribe((value) => {
      const newPasswordAgainControl = this.settingsForm.get('newPasswordAgain');

      if (value)
        newPasswordAgainControl?.setValidators([Validators.required]);
      else
        newPasswordAgainControl?.clearValidators();
      newPasswordAgainControl?.updateValueAndValidity();
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const data = params.get('id');
      if (data !== null) {
        this.idUser = +data;
        this.userIdObservable.sendUserId(this.idUser);
      }
    });
  }

  private _createFormGroup(): FormGroup {
    return new FormGroup({
      username : new FormControl('', [Validators.minLength(8), Validators.maxLength(16)]),
      newPassword : new FormControl('', [Validators.minLength(8), Validators.maxLength(16)]),
      newPasswordAgain : new FormControl('', [Validators.minLength(8), Validators.maxLength(16)]),
    });
  }

  async onSubmit() {
    try {
      const { username, newPassword, newPasswordAgain } = this.settingsForm.value;
      if (!username && !newPassword && !newPasswordAgain) return;
      const updateData: UpdateUserData = {
        id: this.idUser,
        username,
        password: newPassword,
        passwordAgain: newPasswordAgain
      };
      await this.userRepository.updateUserData(updateData);
    } catch (error: any) {
      this.showAlert = true;
      this.errorInfo = error.message;
      setTimeout(() => this.showAlert = false, 2500);
    }
  }
}
