import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  title: string;
  message: string;

 constructor(
   public dialogRef: MatDialogRef<MessageModalComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) { }

 ngOnInit() {

   this.title = this.data ? this.data.title :  'Warning';
   this.message = this.data ? this.data.message : 'Are you sure ?';
 }
}
