export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface User {
  id: number;
  name: string;
  username: string;
  token: string;
}

export interface Error {
  message: string;
}
