import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { LoginRequest } from './login-request.model';
import _map from 'lodash/map';

type ErrorMessages = {
  [key in string]: string
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('email', { static: true }) emailRef!: NgModel;
  @ViewChild('password', { static: true }) passwordRef!: NgModel;
  model = new LoginRequest('', '');

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() { console.log('submit', this.model, this.emailRef) }

  get emailErrors(): string[]  {
    const errorMessages: ErrorMessages = {
      required: 'field is required',
      email: 'invalid email format'
    }
    return this.getErrorMessages(this.emailRef, errorMessages);
 
  }

  get passwordErrors(): string[] {
    const errorMessages: ErrorMessages = {
      required: 'password is required',
    }
    return this.getErrorMessages(this.passwordRef, errorMessages);
  }

  // TODO: service?
  getErrorMessages(elementRef: NgModel, errorMessages: ErrorMessages): string[] {
    const {dirty, control: {errors}} = elementRef;
    
    let messages: string[] = [];
    if (dirty && errors) {
      messages = _map(errors, (value: boolean, ruleName: string) => errorMessages[ruleName]) as unknown as string[];
    }
    return messages;
  }
}
