import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISelectBoxOption } from '../models/select-box-model';
import { DEFAULT_SORT_CONTACT_COLUMN, DEFAULT_SORT_DIRECTION } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, ) { }

  getStatus(): Observable<ISelectBoxOption[]> {
    return this.http.get('../../../assets/data/status-data.json') as Observable<ISelectBoxOption[]>;
  }

  sortData(columnName = DEFAULT_SORT_CONTACT_COLUMN, direction = DEFAULT_SORT_DIRECTION) {
    return (a, b) => { 
      /**To ignore upper case and lower case*/
      const UPPERCASE_FIRST_COLUMN = a[columnName].toUpperCase();
      const UPPERCASE_SECOND_COLUMN = b[columnName].toUpperCase();
      const COMPARE_VALUE = direction === 'asc' ? 1 : -1;
      return (UPPERCASE_FIRST_COLUMN > UPPERCASE_SECOND_COLUMN) ? COMPARE_VALUE: 
              (UPPERCASE_FIRST_COLUMN < UPPERCASE_SECOND_COLUMN) ? -COMPARE_VALUE : 0;
    }
  }

}
