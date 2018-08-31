import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  public static checkConfirmPass(pass, confirm): boolean {
    return (pass.untouched && confirm.untouched)
      || (!pass.untouched && confirm.untouched)
      || (pass.value === confirm.value);
  }
}
