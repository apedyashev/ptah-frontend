import { Directive } from '@angular/core';
import {
  Validator,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';

export const confirmedPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');
  if (password && passwordConfirmation) {
    // compare passwords only when both fields are valid
    if (
      password.valid &&
      passwordConfirmation.valid &&
      password.value !== passwordConfirmation.value
    ) {
      return { confirmedPassword: false };
    }
  }
  return null;
};

@Directive({
  selector: '[appConfirmedPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmedPasswordDirective, multi: true }],
})
export class ConfirmedPasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return confirmedPasswordValidator(control);
  }
}
