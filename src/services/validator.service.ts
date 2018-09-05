import {AbstractControl, ValidatorFn} from '@angular/forms';
import {PhoneNumber, PhoneNumberUtil} from 'google-libphonenumber';

export class ValidatorService {

  static matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPass').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPass').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }

  static validCountryPhone(regionCode?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let validNumber = false;
      try {
        const phoneNumber = PhoneNumberUtil.parseAndKeepRawInput(
          control.value, regionCode
        );
        validNumber = PhoneNumberUtil.isValidNumber(phoneNumber);
      } catch (e) {
      }
      return validNumber ? null : {'wrongNumber': {value: control.value}};
    };
  }
}
