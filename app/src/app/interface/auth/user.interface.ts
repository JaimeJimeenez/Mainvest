export interface User {
  id: string,
  name : string,
  username: string,
  password: string,
  email: string,
  isActive: boolean,
  isAdmin: boolean,
  isAuth: boolean
};

export const initUser : User = {
    id: '',
    name : '',
    username: '',
    password: '',
    email: '',
    isActive: false,
    isAdmin: false,
    isAuth: false,
}
