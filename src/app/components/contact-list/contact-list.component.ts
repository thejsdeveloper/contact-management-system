import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { filter, pluck, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ContactModalService } from '../../services/contact-modal.service';
import { MessageModalService } from './../../services/message-modal.service';

import { IContact, IConfirmModalData } from '../../models/contact-model';
import { AutoUnsubscribe, untilDestroyed } from '../../decorators/auto-unsubscribe-decorator';
import { DEFAULT_SORT_CONTACT_COLUMN, DEFAULT_SORT_DIRECTION } from './../../app-constants';
import { MatSort } from '@angular/material';
import { CommonService } from '../../services/common.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy, AfterViewInit {

  contacts: IContact[];
  defaultSortColumn: string;
  defaultSortDirection: string;
  sortDirection: string;
  sortColumn: string;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private activateRoute: ActivatedRoute,
    private contactModalService: ContactModalService,
    private messageModalService: MessageModalService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.defaultSortColumn = this.sortColumn = DEFAULT_SORT_CONTACT_COLUMN;
    this.defaultSortDirection = this.sortDirection = DEFAULT_SORT_DIRECTION;
    
    this.contacts = this.activateRoute.snapshot.data['contactList'];
  }

  ngAfterViewInit() {
    this.matSort.sortChange.
      pipe(
        tap(sortInfo => ({ active: this.sortColumn, direction: this.sortDirection } = sortInfo)),
        untilDestroyed(this)
      ).
      subscribe(_ =>
        this.contacts = this.loadSortedData(this.sortColumn, this.sortDirection)
      );
  }

  ngOnDestroy() { }

  loadSortedData(sortColumn: string, sortDirection: string) {
    return this.contacts.sort(this.commonService.sortData(sortColumn, sortDirection))
  }

  addContact() {
    this.contactModalService.open().
      afterClosed().
      pipe(
        filter(contact => contact),
        tap(contact => this.contacts.push(contact)),
        untilDestroyed(this)
      ).
      subscribe(_ => this.loadSortedData(this.sortColumn, this.sortDirection));
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
