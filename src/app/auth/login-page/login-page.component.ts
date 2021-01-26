import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { LoginRequest } from './login-request.model';
import _map from 'lodash/map';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @ViewChild('email', { static: true }) emailRef!: NgModel;

  model = new LoginRequest('', '');

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() { console.log('submit', this.model, this.emailRef) }

  get emailError(): string[]  {
    const {dirty, control: {errors}} = this.emailRef;
    let messages: string[] = []
    const errorMessages: {[key in string]: string} = {
      required: 'field is required',
      email: 'invalid email format'
    }
    
    if (dirty && errors) {
      messages = _map(errors, (value: boolean, ruleName: string) => errorMessages[ruleName]) as unknown as string[];
    }
    return messages;
  }
}
