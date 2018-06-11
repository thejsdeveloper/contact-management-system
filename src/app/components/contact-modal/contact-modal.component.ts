import { Component, OnInit } from '@angular/core';
import { REQUIRED_ERROR } from '../../app-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISelectBoxOption } from '../../models/select-box-model';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {

  REQUIRED_ERROR = REQUIRED_ERROR;
  form: FormGroup;
  contactStatus: ISelectBoxOption[];
  data: any = {
    title: 'Add contact'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.contactStatus = [{
      id: 1,
      name: 'Active'
    }, {
      id: 2,
      name: 'Inactive'
    }];

    this.form = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phoneNumber': ['', Validators.required],
      'status': ['', Validators.required],
    });
  }

  hasError(fieldName: string, errorName: string) {
    return this.form.get(fieldName).hasError(errorName);
  }

}
