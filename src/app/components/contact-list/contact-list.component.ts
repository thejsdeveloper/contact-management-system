import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ContactService } from '../../services/contact.service';
import { ContactModalService } from '../../services/contact-modal.service';
import { MessageModalService } from './../../services/message-modal.service';

import { IContact, IConfirmModalData } from '../../models/contact-model';
import { AutoUnsubscribe, untilDestroyed } from '../../decorators/auto-unsubscribe-decorator';
import { DEFAULT_SORT_CONTACT_COLUMN } from './../../app-constants';

@AutoUnsubscribe()
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: IContact[];
  defaultSortColumn: string;
  constructor(
    private activateRoute: ActivatedRoute,
    private contactService: ContactService,
    private contactModalService: ContactModalService,
    private messageModalService: MessageModalService
  ) { }

  ngOnInit() {
    this.defaultSortColumn = DEFAULT_SORT_CONTACT_COLUMN;
    this.contacts = this.activateRoute.snapshot.data['contactList'];
    this.sortData(this.defaultSortColumn, 'asc');
  }

  ngOnDestroy() { }

  sortData(columnName: string, direction: string) {
    this.contacts = this.contacts.sort((a, b) => direction === 'asc' ? b[columnName] - a[columnName] : a[columnName] - b[columnName]);
    console.log(this.contacts);
  }

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

    const data: IConfirmModalData = {
      title: `Warning`,
      message: `Are you sure you want to delete this contact?`
    };
    this.messageModalService.open(data).
      afterClosed().
      pipe(
        filter(flag => flag),
        untilDestroyed(this)
      ).
      subscribe(_ =>
        this.contacts = this.contacts.filter(contact => contact.id !== contactId)
      );

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
