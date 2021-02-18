import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { LoginRequest } from './login-request.model';
import { AuthService } from '../auth.service';
// services
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  @ViewChild('email', { static: true }) emailRef!: NgModel;
  @ViewChild('password', { static: true }) passwordRef!: NgModel;
  model = new LoginRequest('', '');
  serverResponseError: string = '';

  constructor(private authService: AuthService, private validationService: ValidationService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.model).subscribe({
      next() {
        console.log('logged in');
      },
      error: ({ message, errors }) => {
        this.validationService.setServerErrorsToFields(this, errors);
        this.serverResponseError = message;
      },
    });
  }

  get emailErrors(): string[] {
    return this.validationService.getErrorMessages(this.emailRef, {
      required: 'Field is required',
      email: 'Invalid email format',
    });
  }

  get passwordErrors(): string[] {
    return this.validationService.getErrorMessages(this.passwordRef, {
      required: 'Password is required',
      minlength: 'Enter at least 8 characters',
    });
  }
}
