import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class LoginService {

  baseUrl: string = "http://localhost:3000/login/user";

  constructor(private http: Http) { }

  doLogin(email, password) {
    return this.http.post(`${this.baseUrl}`, { email: email, password: password });
  }

}
