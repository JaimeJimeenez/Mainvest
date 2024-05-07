import { LogIn } from "../interfaces/auth";
import { User } from "../interfaces/user";

export class LocalStorage {

  static getUser(): User | undefined {
    const data: string | null= localStorage.getItem('user');
    return data !== null ? JSON.parse(data) : undefined;
  }

  static saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static saveRememberUser(user: LogIn): void {
    localStorage.setItem('rememberedUser', JSON.stringify(user));
  };

  static getRememberedUser(): LogIn | undefined {
    const data: string | null = localStorage.getItem('rememberedUser');
    return data !== null ? JSON.parse(data) : undefined;
  }

  static getToken(): string | undefined {
    const data: string | null = localStorage.getItem('user');
    return data !== null ? JSON.parse(data).token : undefined;
  }

  static eraseData(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedUser');
  }

  static eraseUser(): void {
    localStorage.removeItem('user');
  }
}
