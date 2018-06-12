import { Component, OnInit, OnDestroy } from '@angular/core';


import { ContactService } from '../../services/contact.service';
import { ContactModalService } from '../../services/contact-modal.service';

import { IContact } from '../../models/contact-model';
import { AutoUnsubscribe, untilDestroyed } from '../../decorators/auto-unsubscribe-decorator';
import { filter } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: IContact[];

  constructor(
    private contactService: ContactService,
    private contactModalService: ContactModalService
  ) { }

  ngOnInit() {
    this.contactService.getContactList().pipe(untilDestroyed(this)).subscribe(data => this.contacts = data);
  }

  ngOnDestroy() { }


  addContact() {
    this.contactModalService.open().
      afterClosed().
      pipe(
        filter(contact => contact),
        untilDestroyed(this)
      ).
      subscribe(contact => this.contacts.unshift(contact));
  }

  deleteContact(contactId: string) {
    this.contacts = this.contacts.filter(contact => contact.id !== contactId)
  }

  editContact(contact: IContact) {
    this.contactModalService.open(contact).
      afterClosed().
      pipe(
        filter(editedContact => editedContact),
        untilDestroyed(this)
      ).
      subscribe(editedContact =>
        this.contacts = this.contacts.map(contact => contact.id === editedContact.id ? contact = editedContact : contact)
      );
  }
}
