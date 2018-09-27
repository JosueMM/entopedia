import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Photo } from '../../photo';

@Injectable()
export class PhotoService {

  baseUrl: string = "http://localhost:3000/photo/artropodo";

  constructor(private http: Http) { }

  savePhoto(photo: Photo) {

    //const formData: FormData = new FormData();
    //formData.append('filekey', fileToUpload, fileToUpload.name)
    //formData.append

    return this.http.post(`${this.baseUrl}`, photo, { headers: new Headers(this.headers()) });
  }

  headers() {
    return {
      'Authorization': 'bearer ' + localStorage.getItem('token')
    }
  }

}
