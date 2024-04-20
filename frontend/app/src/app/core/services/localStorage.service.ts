import { User } from "../interfaces/client/client";
import { Login } from "../interfaces/user/login";

export class LocalStorage {

  static saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }

  static saveRememberUser(user: Login) {
    localStorage.setItem('rememberedUser', JSON.stringify(user));
  };

  static getRememberedUser(): Login | undefined {
    const data : string | null = localStorage.getItem('rememberedUser')
    console.log(data);
    if (data !== null) {
      const { username, password } = JSON.parse(data);
      const user: Login = { username, password };
      return user;
    }
    return undefined;
  }

  static getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }
}
