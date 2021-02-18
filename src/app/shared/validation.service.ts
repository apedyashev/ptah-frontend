import { Injectable } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import _map from 'lodash/map';
// types
import { ErrorMessages } from '../types';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getErrorMessages(elementRef: NgModel | NgForm, errorMessages: ErrorMessages): string[] {
    let messages: string[] = [];
    let errors;
    if (elementRef instanceof NgForm) {
      if ((elementRef.touched || elementRef.dirty) && elementRef.errors) {
        errors = elementRef.errors;
      }
    } else {
      errors = elementRef.control.errors;
    }

    const { dirty } = elementRef;

    if (errors?.areServerErrors) {
      messages = errors.errors;
    } else {
      if (dirty && errors) {
        messages = (_map(
          errors,
          (value: boolean, ruleName: string) => errorMessages[ruleName]
        ) as unknown) as string[];
      }
    }

    return messages;
  }

  setServerErrorsToFields(component: any, errors: string[]) {
    for (let fieldName in errors) {
      const fieldRefName = `${fieldName}Ref`;
      const fieldRef = component[fieldRefName];
      if (fieldRef) {
        fieldRef.control.setErrors({
          areServerErrors: true,
          errors: errors[fieldName],
        });
      } else {
        console.error(`${fieldRefName} not found`);
      }
    }
  }
}
