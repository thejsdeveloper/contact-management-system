import { CommonService } from './../../services/common.service';

import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid';

import { REQUIRED_ERROR, INVALID_PHONE_NUMBER } from '../../app-constants';
import { CREATE_FORM_CONSTANTS, EDIT_FORM_CONSTANTS } from './../../app-constants';
import { ISelectBoxOption } from '../../models/select-box-model';
import { AutoUnsubscribe, untilDestroyed } from '../../decorators/auto-unsubscribe-decorator';

@AutoUnsubscribe()
@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit, OnDestroy {

  REQUIRED_ERROR = REQUIRED_ERROR;
  INVALID_PHONE_NUMBER = INVALID_PHONE_NUMBER;
  form: FormGroup;
  contactStatus: ISelectBoxOption[];
  data: { [key: string]: string };

  constructor(
    public dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: any,
    private fb: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.init();

    this.form = this.fb.group({
      'id': [''],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phoneNumber': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'status': ['', Validators.required],
    });


    if (this.contact) {
      this.form.setValue(this.contact);
      this.data = EDIT_FORM_CONSTANTS
    } else {
      this.form.get('id').setValue(UUID.UUID())
    }
  }

  ngOnDestroy() { }

  init() {
    this.data = CREATE_FORM_CONSTANTS;

    this.commonService.getStatus().pipe(untilDestroyed(this)).subscribe(status => this.contactStatus = status);
  }

  hasError(fieldName: string, errorName: string) {
    return this.form.get(fieldName).hasError(errorName);
  }

  isValid() {
    return !this.form.valid || this.form.pristine;
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

}
;
