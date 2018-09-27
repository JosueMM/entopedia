import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Arthropod } from '../../arthropod';

@Injectable()
export class ArthropodService {

  baseUrl: string = "http://localhost:3000/entopedia/arthropod";

  constructor(private http: Http) { }

  getArthropod() {
    return this.http.get(`${this.baseUrl}`);
  }

  getSearch(word: string) {
    return this.http.get(`http://localhost:3000/entopedia/arthropod/search/${word}`);
  }

  getAdvance(word: string) {
    return this.http.get(`http://localhost:3000/entopedia/arthropod/advace/${word}`);
  }

  addArthropod(newArthropod: Arthropod) {
    return this.http.post(`${this.baseUrl}`, newArthropod, { headers: new Headers(this.headers()) });
  }

  updateArthropod(newArthropod: Arthropod) {
    return this.http.put(`${this.baseUrl}/${newArthropod.id}`, newArthropod, { headers: new Headers(this.headers()) });
  }

  deleteArthropod(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: new Headers(this.headers()) });
  }


  headers() {
    return {
      'Authorization': 'bearer ' + localStorage.getItem('token')
    }
  }
}
