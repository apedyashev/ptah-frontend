import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { LoginRequest } from './login-request.model';
import { AuthService } from '../auth.service';

import _map from 'lodash/map';

type ErrorMessages = {
  [key in string]: string
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  @ViewChild('email', { static: true }) emailRef!: NgModel;
  @ViewChild('password', { static: true }) passwordRef!: NgModel;
  model = new LoginRequest('', '');
  serverResponseError: string = ''

  constructor(private authService: AuthService) { }

  ngOnInit(): void { 
  }

  onSubmit() { 
    this.authService.login(this.model).subscribe({
      next() { console.log('logged in'); },
      error: (err) => { 
        this.serverResponseError = err
      }
    })
  }

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
