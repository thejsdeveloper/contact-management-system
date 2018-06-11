import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactService } from '../../services/contact.service';

import { IContact } from '../../models/contact-model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Observable<IContact[]>;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContactList();
  }

}
