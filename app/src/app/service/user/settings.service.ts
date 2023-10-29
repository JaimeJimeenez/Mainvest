import { Injectable } from '@angular/core';
import { SettingsDataService } from '../requests/user/settings-data.service';

import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private settingsData : SettingsDataService) { }

  updateUsername(oldUsername : string, newUsername : string) : Promise<boolean> {
    return this.settingsData.updateUsername(oldUsername, newUsername);
  }

  updatePassword(username : string, password : string) : Promise<boolean> {
    return this.settingsData.updatePassword(username, bcrypt.hashSync(password, 10));
  }
}
