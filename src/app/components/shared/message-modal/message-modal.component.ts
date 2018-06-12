import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { IConfirmModalData } from '../../../models/contact-model';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  title: string = 'Warning';
  message: string = 'Are you sure ?';

 constructor(
   public dialogRef: MatDialogRef<MessageModalComponent>,
   @Inject(MAT_DIALOG_DATA) public data: IConfirmModalData
 ) { }

 ngOnInit() {
  ({title: this.title, message: this.message} = this.data)
 }
}
