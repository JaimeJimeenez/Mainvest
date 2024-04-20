import { User } from "../interfaces/client/client";
import { Login } from "../interfaces/user/login";

export class LocalStorage {

  static saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }

  static saveRememberUser(user: User) {
    localStorage.setItem('rememberedUser', JSON.stringify(user));
  };

  static getRememberedUser(): Login | undefined {
    const data : string | null = localStorage.getItem('rememberedUser')
    if (data !== null) {
      const { username, password } = JSON.parse(data);
      const user: Login = { username, password };
      return user;
    }
    return undefined;
  }
}
