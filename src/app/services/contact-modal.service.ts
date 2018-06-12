
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ContactModalComponent } from '../components/contact-modal/contact-modal.component';
import { IContact } from '../models/contact-model';


@Injectable({
  providedIn: 'root'
})
export class ContactModalService {

  constructor(private dialog: MatDialog) { }

  open(data: IContact = null) {
    return this.dialog.open(ContactModalComponent, {
      width: '40vw',
      data: data
    });
  }



}
