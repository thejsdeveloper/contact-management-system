import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ContactModalComponent } from '../components/contact-modal/contact-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ContactModalService {

  constructor(private dialog: MatDialog) { }

  open() {
    return this.dialog.open(ContactModalComponent, {
      width: '40vw'
    });
  }

}
