import { Injectable } from '@angular/core';
import { Image } from '../../image';
import { IMAGES } from '../../mock-images';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HomeService {

  constructor() { }

  getImages(): Observable<Image[]> {
    return of(IMAGES);
  }

}
