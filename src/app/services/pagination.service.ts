import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

constructor() { }

getPagedRecords(totalRecords: any[], startIndex: number, endIndex: number): any[] {
  return totalRecords.slice(startIndex, endIndex + 1);
}

getEndIndex(startIndex: number, pageSize: number, totalItems: number): number {
  return Math.min(startIndex + pageSize - 1, totalItems - 1);
}

getStartIndex(currentPage: number, pageSize: number): number {
  return (currentPage) * pageSize;
}

}
