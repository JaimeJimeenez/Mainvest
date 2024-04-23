export interface User {
  id: number;
  token: string;
}

export interface Username {
  username: string;
}

export interface UpdateUserData {
  id: number;
  username: string;
  password: string;
  passwordAgain: string;
}
