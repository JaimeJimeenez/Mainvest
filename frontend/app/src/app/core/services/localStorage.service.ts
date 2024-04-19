import { User } from "../interfaces/client/client";

export class LocalStorage {

  static saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }
}
