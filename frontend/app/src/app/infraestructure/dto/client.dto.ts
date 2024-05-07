export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Error {
  message: string;
}
