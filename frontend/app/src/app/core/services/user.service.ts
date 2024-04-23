import { Injectable } from '@angular/core';
import { LocalStorage } from 'src/app/core/libs/local.storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  public isUserLoggedIn(): boolean {
    return LocalStorage.getToken() !== undefined;
  }

  public getUserId(): number {
    const user = LocalStorage.getUser();
    return user ? user.id : 0;
  }
}
