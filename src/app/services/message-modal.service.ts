import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { MessageModalComponent } from '../components/shared/message-modal/message-modal.component';
import { IConfirmModalData } from '../models/contact-model';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {


constructor(private dialog: MatDialog) { }
  open(data: IConfirmModalData = null) {
    return this.dialog.open(MessageModalComponent, {
      width: '350px',
      data: data
    });
  }
}
