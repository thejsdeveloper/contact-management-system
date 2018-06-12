/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageModalService } from './message-modal.service';

describe('Service: MessageModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageModalService]
    });
  });

  it('should ...', inject([MessageModalService], (service: MessageModalService) => {
    expect(service).toBeTruthy();
  }));
});
