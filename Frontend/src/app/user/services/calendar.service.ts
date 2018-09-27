import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { CalendarEventDB } from '../../event';

@Injectable()
export class CalendarService {
  baseUrl: string = "http://localhost:3000/entopedia/calendar";

  constructor(private http: Http) { }

  getCalendar() {
    return this.http.get(`${this.baseUrl}`, { headers: new Headers(this.headers()) });
  }

  addCalendar(newEvent: CalendarEventDB) {
    return this.http.post(`${this.baseUrl}`, newEvent, { headers: new Headers(this.headers()) });
  }

  updateCalendar(newEvent: CalendarEventDB) {
    return this.http.put(`${this.baseUrl}/${newEvent.id}`, newEvent, { headers: new Headers(this.headers()) });
  }

  deleteCalendar(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: new Headers(this.headers()) });
  }

  headers() {
    return {
      'Authorization': 'bearer ' + localStorage.getItem('token')
    }
  }

}
