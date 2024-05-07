export abstract class AuthRepository {
  abstract signUp(email: string, name: string, username: string, password: string): void;
  abstract logIn(username: string, password: string, rememberUser: boolean): void;
}
