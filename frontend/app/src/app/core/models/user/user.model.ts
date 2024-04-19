export class User {

  private _id: number = 0;
  private _name: string = '';
  private _username: string = '';
  private _password: string = '';

  constructor(
    id: number,
    name: string,
    username: string,
    password: string
  ) {
    this._id = id;
    this._name = name;
    this._username = username;
    this._password = password;
  }
}
