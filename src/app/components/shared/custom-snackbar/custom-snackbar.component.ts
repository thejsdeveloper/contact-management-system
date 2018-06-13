import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'cltr-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackbarRef: MatSnackBarRef<CustomSnackbarComponent>
  ) { }

  ngOnInit() {
  }

  close() {
    this.snackbarRef.dismiss();
  }
}
