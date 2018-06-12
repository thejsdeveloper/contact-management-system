import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule
  ],
})
export class AppMaterialModule { }
