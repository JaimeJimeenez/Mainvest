import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SettingsService } from 'src/app/service/user/settings.service';

@Component({
  selector: 'mainvest-profile-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public route : string = '/dashboard/profile/settings';
  public settingsForm : FormGroup;
  public showAlert : boolean = false;
  public alertMessage : string = '';

  constructor(
    private settings : SettingsService,
    private auth : AuthService,
    private router : Router
  ) {
    this.settingsForm = new FormGroup({
      username : new FormControl('', [Validators.minLength(8), Validators.maxLength(16)]),
      newPassword : new FormControl('', [Validators.minLength(8), Validators.maxLength(16)]),
      newPasswordAgain : new FormControl('', [Validators.minLength(8), Validators.maxLength(16)]),
    });
    this.settingsForm.get('newPassword')?.valueChanges.subscribe((value) => {
      const newPasswordAgainControl = this.settingsForm.get('newPasswordAgain');

      if (value)
        newPasswordAgainControl?.setValidators([Validators.required]);
      else
        newPasswordAgainControl?.clearValidators();
      newPasswordAgainControl?.updateValueAndValidity();
    });
  }

  private _removeLocalStorage() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  private _updateUsername(username : string) : void {
    this.settings.updateUsername(this.auth.user.username, username)
    .then((success) => {
      if (success)
        this._removeLocalStorage();
      else {
        this.showAlert = true;
        this.alertMessage = 'El nombre de usuario ya existe';
        setTimeout(() => this.showAlert = false, 2500);
      }
    })
    .catch((error) => {
      this.showAlert = true;
      this.alertMessage = 'Algo ha salido mal';
      setTimeout(() => this.showAlert = false, 2500);
    })
  }

  private _updatePassword(username : string, password : string) : void {
    this.settings.updatePassword(username, password)
    .then((success) => {
      if (success)
        this._removeLocalStorage();
    })
    .catch((error) => {
      this.showAlert = true;
      this.alertMessage = 'Algo ha salido mal';
      setTimeout(() => this.showAlert = false, 2500);
    });
  }

  eraseUser() : void {
    this.settings.eraseUser(this.auth.user.username)
    .then((success) => {
      if (success)
        this._removeLocalStorage();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onSubmit() : void {
    const { username, newPassword, newPasswordAgain } = this.settingsForm.value;
    if (!username && !newPassword && !newPasswordAgain) return;

    if (newPassword !== newPasswordAgain) {
      this.showAlert = true;
      this.alertMessage = 'Las contraseñas no coinciden'
      setTimeout(() => this.showAlert = false, 2500);
    } else if (!newPassword)
      this._updateUsername(username);
    else
      this._updatePassword(this.auth.user.username, newPassword);
  }
}
