export class SignUp {

  private _email: string = '';
  private _name: string = '';
  private _username: string = '';
  private _password: string = '';

  constructor(
    email: string,
    name: string,
    username: string,
    password: string)
  {
    this._email = email;
    this._name = name;
    this._username = username;
    this._password = password;
  }
}
