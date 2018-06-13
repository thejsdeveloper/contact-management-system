import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ContactModalService } from '../../services/contact-modal.service';
import { MessageModalService } from './../../services/message-modal.service';

import { IContact, IConfirmModalData } from '../../models/contact-model';
import { AutoUnsubscribe, untilDestroyed } from '../../decorators/auto-unsubscribe-decorator';
import { DEFAULT_SORT_CONTACT_COLUMN, DEFAULT_SORT_DIRECTION } from './../../app-constants';
import { MatSort, MatPaginator } from '@angular/material';
import { CommonService } from '../../services/common.service';
import { PaginationService } from '../../services/pagination.service';
import { merge } from 'rxjs';
import { CustomSnackbarService } from '../../services/custom-snackbar.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy, AfterViewInit {

  contacts: IContact[];
  pagedContacts: IContact[];
  defaultSortColumn: string;
  defaultSortDirection: string;
  sortDirection: string;
  sortColumn: string;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  endIndex: number;
  totalItems: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private contactModalService: ContactModalService,
    private messageModalService: MessageModalService,
    private commonService: CommonService,
    private paginationService: PaginationService,
    public customSnackbarService: CustomSnackbarService,
  ) {

    this.startIndex = 0;
    this.pageSize = 10;
    this.currentPage = 0;
  }

  ngOnInit() {
    this.defaultSortColumn = this.sortColumn = DEFAULT_SORT_CONTACT_COLUMN;
    this.defaultSortDirection = this.sortDirection = DEFAULT_SORT_DIRECTION;

    this.contacts = this.activateRoute.snapshot.data['contactList'];

    this.totalItems = this.contacts.length;

    this.startIndex = this.paginationService.getStartIndex(this.currentPage, this.totalItems);
    this.endIndex = this.paginationService.getEndIndex(this.startIndex, this.pageSize, this.totalItems);
    this.pagedContacts = this.paginationService.getPagedRecords(this.contacts, this.startIndex, this.endIndex);
  }

  ngAfterViewInit() {
    const matSortStream =
      this.matSort.sortChange.
        pipe(
          tap(sortInfo => {
            ({ active: this.sortColumn, direction: this.sortDirection } = sortInfo);
            this.matPaginator.pageIndex = 0;
            this.currentPage = 0;
            this.contacts = this.loadSortedData(this.sortColumn, this.sortDirection);
          }),
          untilDestroyed(this)
        );

    const matPaginatorStream =
      this.matPaginator.page.
        pipe(
          tap(page => this.currentPage = page.pageIndex),
          untilDestroyed(this)
        );

    merge(matSortStream, matPaginatorStream).
      pipe(untilDestroyed(this)).
      subscribe(_ => this.loadPaginatedData());


  }
  ngOnDestroy() { }

  loadSortedData(sortColumn: string, sortDirection: string) {
    return this.contacts.sort(this.commonService.sortData(sortColumn, sortDirection))
  }

  loadPaginatedData() {
    this.startIndex = this.paginationService.getStartIndex(this.currentPage, this.pageSize);
    this.endIndex = this.paginationService.getEndIndex(this.startIndex, this.pageSize, this.totalItems);
    this.pagedContacts = this.paginationService.getPagedRecords(this.contacts, this.startIndex, this.endIndex);
  }

  addContact() {
    this.contactModalService.open().
      afterClosed().
      pipe(
        filter(contact => contact),
        tap(contact => this.addContactInArray(contact)),
        untilDestroyed(this)
      ).
      subscribe((contact: IContact) => {
        this.customSnackbarService.open(`${contact.firstName} ${contact.lastName} has been added successfully.`);
        this.contacts =  this.loadSortedData(this.sortColumn, this.sortDirection);
        this.loadPaginatedData()
      });
  }

  addContactInArray(contact: IContact){
    this.contacts.push(contact);
    this.pagedContacts.push(contact);
    this.totalItems = this.getTotalItems();
  }

  getTotalItems() {
    return this.contacts.length;
  }
  deleteContact(contact: IContact) {

    const FULL_NAME = `${contact.firstName} ${contact.lastName}`;
    const data: IConfirmModalData = {
      title: `Warning`,
      message: `Are you sure you want to delete ${FULL_NAME}?`
    };
    this.messageModalService.open(data).
      afterClosed().
      pipe(
        filter(flag => flag),
        untilDestroyed(this)
      ).
      subscribe(_ => {
        this.deleteContactFromArray(contact.id);
        this.customSnackbarService.open(`${FULL_NAME} has been deleted sucessfully.`)
      });
  }

  deleteContactFromArray(contactId: string) {
    this.contacts = this.contacts.filter(contact => contact.id !== contactId);
    this.pagedContacts = this.pagedContacts.filter(contact => contact.id !== contactId);
    this.totalItems = this.getTotalItems();
  }

  editContact(contact: IContact) {
    this.contactModalService.open(contact).
      afterClosed().
      pipe(
        filter(editedContact => editedContact),
        untilDestroyed(this)
      ).
      subscribe((editedContact: IContact) => {
        this.editContactInArray(editedContact);
        this.customSnackbarService.open(`${editedContact.firstName} ${editedContact.lastName} has been updated sucessfully.`)
      });
  }

  editContactInArray(editedContact: IContact) {
    this.contacts = this.contacts.map(mappedContact => mappedContact.id === editedContact.id ? mappedContact = editedContact : mappedContact)
    this.pagedContacts = this.pagedContacts.map(mappedContact => mappedContact.id === editedContact.id ? mappedContact = editedContact : mappedContact)
  }
}
