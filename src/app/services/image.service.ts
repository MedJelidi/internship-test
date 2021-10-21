import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../models/image.model';
import {map} from 'rxjs/operators';
import {getText} from '../helpers/get-text';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) {
  }

  getImage(id: number): Observable<Image> {
    return this.httpClient.get<Image>('https://picsum.photos/id/' + id + '/info')
      .pipe(
        map((i) => {
          i.text = getText();
          return i;
        })
      );
  }
}
