import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';

import { Observable, tap, map } from 'rxjs';

import { Login } from 'src/app/interface/auth/login.interface';
import { enviroment } from 'src/enviroments/enviroment';
import { User } from '../../interface/auth/user.interface';
import { AuthStatus } from '../../interface/auth/auth-status.interface';

@Injectable({providedIn: 'root'})
export class LoginRequestService {

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus  = computed(() => this._authStatus());

  constructor(
    private httpClient : HttpClient
  ) { }

  login(username : string, password : string) : Observable<boolean> {
    return this.httpClient.post<Login>(`${enviroment.baseUrl}`, { username, password }).pipe(
      tap(({ user, token}) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
      }),
      map(() => true),
    )
  }

}
