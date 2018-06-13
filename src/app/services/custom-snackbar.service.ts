

import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { CustomSnackbarComponent } from './../components/shared/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(message: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: message
      },
      duration: 4000,
      panelClass: ['bg-dark', 'mt-5', 'toast-z-index'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

}
