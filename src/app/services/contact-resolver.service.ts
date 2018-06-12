

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ContactService } from './contact.service';

import { IContact } from './../models/contact-model';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<IContact[]> {

constructor(private contactService: ContactService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContact[]>  {
  return this.contactService.getContactList();
}

}
