import { Observable } from "rxjs";

import { UpdateUserData, Username } from "../interfaces/user";

export abstract class UserRepository {
  abstract getUsername$(id: number): Observable<Username>;
  abstract updateUserData(updateData: UpdateUserData): void;
  abstract changePassword$(id: number, password: string): Observable<boolean>;
  abstract changeUsername$(id: number, username: string): Observable<boolean>;
  abstract getUser$(username: string): Observable<any>;
  abstract getMoney$(id: number): Observable<number>;
  abstract updateMoney$(id: number, money: number): Observable<boolean>;
  abstract eraseUser(id: number): void;
}
