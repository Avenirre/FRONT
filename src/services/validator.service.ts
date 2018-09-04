import {AbstractControl} from '@angular/forms';
export class ValidatorService {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPass').value; // to get value in input tag
    if (password !== confirmPassword) {
      console.log('false');
      AC.get('confirmPass').setErrors( {MatchPassword: true} )
    } else {
      console.log('true');
      return null;
    }
  }
}
