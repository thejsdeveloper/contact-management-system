/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactModalService } from './contact-modal.service';

describe('Service: ContactModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactModalService]
    });
  });

  it('should ...', inject([ContactModalService], (service: ContactModalService) => {
    expect(service).toBeTruthy();
  }));
});
