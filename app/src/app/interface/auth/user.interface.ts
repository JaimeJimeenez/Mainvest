export interface User {
  id: string,
  username: string,
  password: string,
  email: string,
  isActive: boolean,
  isAdmin: boolean,
  isAuth: boolean
};

export const initUser : User = {
    id: '',
    username: '',
    password: '',
    email: '',
    isActive: false,
    isAdmin: false,
    isAuth: false,
}
