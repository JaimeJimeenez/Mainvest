import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";
import { Router } from "@angular/router";

import { UserRepository } from "src/app/core/repositories/user.repository";

import { UpdateMoney, UpdateUserData, Username } from "src/app/core/interfaces/user";
import { PasswordDTO, UsernameDTO } from "../../dto/user.dto";

import { UserService } from "src/app/core/services/user.service";
import { LocalStorage } from "src/app/core/libs/local.storage";

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryImpl extends UserRepository{


  constructor(private user: UserService, private route: Router) {
    super();
  }

  override getUsername$(id: number): Observable<Username> {
    try {
      return this.user.getUsername$(id);
    } catch (error: any) {
      throw error;
    }
  }

  override async updateUserData(updateData: UpdateUserData) {
    try {
      const { id, username, password, passwordAgain } = updateData;
      if (username) await lastValueFrom(this.changeUsername$(id, username));
      if (password) {
        if (password !== passwordAgain) throw new Error('Las contraseñas no coinciden');
        await lastValueFrom(this.changePassword$(id, password));
      }
      this.route.navigate(['/dashboard']);
    } catch (error) {
      throw error;
    }
  }

  override changePassword$(id: number, password: string): Observable<boolean> {
    try {
      const newPassword: PasswordDTO = { id, password }
      return this.user.changePassword$(newPassword);
    } catch (error: any) {
      throw error;
    }
  }

  override changeUsername$(id: number, username: string): Observable<boolean> {
    try {
      const newUsername: UsernameDTO = { id, username };
      return this.user.changeUsername$(newUsername);
    } catch (error: any) {
      throw error;
    }
  }

  override getUser$(username: string): Observable<any> {
    try {
      return this.user.getUser$(username);
    } catch (error) {
      throw error;
    }
  }

  override getMoney$(id: number): Observable<number> {
    try {
      return this.user.getMoney$(id);
    } catch (error) {
      throw error;
    }
  }

  override updateMoney$(id: number, money: number): Observable<boolean> {
    try {
      const updateMoney: UpdateMoney = { id, money };
      return this.user.updateMoney$(updateMoney);
    } catch (error) {
      throw error;
    }
  }

  override async eraseUser(id: number) {
    try {
      await lastValueFrom(this.user.eraseUser$(id));
      LocalStorage.eraseData();
      this.route.navigate(['/auth/login']);
    } catch (error: any) {
      throw error;
    }
  }
}
