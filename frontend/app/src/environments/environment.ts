import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  dataUrl: 'http://localhost:52300',
  externalUrl: 'http://127.0.0.1:5000/',
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

