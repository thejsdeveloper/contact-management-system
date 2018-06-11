import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IContact } from '../models/contact-model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

constructor(private http: HttpClient) { }


getContactList(): Observable<IContact[]> {
 return  this.http.get('../../../assets/data.json') as Observable<IContact[]>;
}

}
