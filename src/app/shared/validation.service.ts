import { Injectable } from '@angular/core';
import { NgModel } from '@angular/forms';
import _map from 'lodash/map';
// types
import { ErrorMessages } from './types';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getErrorMessages(elementRef: NgModel, errorMessages: ErrorMessages): string[] {
    const {
      dirty,
      control: { errors },
    } = elementRef;

    let messages: string[] = [];
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
}
