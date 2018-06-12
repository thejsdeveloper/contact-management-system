import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IContact } from '../models/contact-model';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(
  private http: HttpClient,
  private commonService: CommonService
) { }


getContactList(): Observable<IContact[]> {
 return  this.http.get('../../../assets/data/data.json').pipe(
   map((data: IContact[]) => data.sort(this.commonService.sortData()))
 ) as Observable<IContact[]>;
}

}
