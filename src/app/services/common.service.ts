import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISelectBoxOption } from '../models/select-box-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, ) { }

  getStatus(): Observable<ISelectBoxOption[]> {
    return this.http.get('../../../assets/data/status-data.json') as Observable<ISelectBoxOption[]>;
  }

}
