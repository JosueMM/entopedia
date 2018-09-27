import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from '../../user';

@Injectable()
export class UserService {

  baseUrl: string = "http://localhost:3000/entopedia/user";

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(`${this.baseUrl}`, { headers: new Headers(this.headers()) });
  }

  addUser(newUser: User) {
    return this.http.post(`${this.baseUrl}`, newUser, { headers: new Headers(this.headers()) });
  }

  updateUser(newUser: User) {
    return this.http.put(`${this.baseUrl}/${newUser.id}`, newUser, { headers: new Headers(this.headers()) });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: new Headers(this.headers()) });
  }

  headers() {
    return {
      'Authorization': 'bearer ' + localStorage.getItem('token')
    }
  }



}
