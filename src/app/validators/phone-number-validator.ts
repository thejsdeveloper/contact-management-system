
import { FormControl } from '@angular/forms';


export function PhoneNumberValidator(formControl: FormControl): { [key: string]: boolean } {
  const FORMATE = /^[6-9]\d{9}$/;
  if (
    formControl.value.match(FORMATE)
  ) {

  } else {
    return { invalidPhoneNumber: true };
  }
}
