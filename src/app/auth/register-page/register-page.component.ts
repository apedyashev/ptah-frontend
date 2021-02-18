import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { RegisterRequest } from './register-request.model';
// services
import { AuthService } from '../auth.service';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {
  @ViewChild('username', { static: true }) usernameRef!: NgModel;
  @ViewChild('email', { static: true }) emailRef!: NgModel;
  @ViewChild('password', { static: true }) passwordRef!: NgModel;
  @ViewChild('passwordConfirmation', { static: true }) passwordConfirmationRef!: NgModel;
  @ViewChild('registerForm', { static: true }) registerFormRef!: NgForm;
  model = new RegisterRequest();
  serverResponseError: string = '';

  constructor(private authService: AuthService, private validationService: ValidationService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.model);
    this.authService.register(this.model).subscribe({
      next() {
        // TODO: show success message
        console.log('registered in');
      },
      error: (err) => {
        for (let fieldName in err.errors) {
          const fieldRefName = `${fieldName}Ref`;
          const fieldRef = (this as any)[fieldRefName];
          if (fieldRef) {
            fieldRef.control.setErrors({
              areServerErrors: true,
              errors: err.errors[fieldName],
            });
          } else {
            console.error(`${fieldRefName} not found`);
          }
        }

        this.serverResponseError = err.message;
      },
    });
  }

  get userNameErrors(): string[] {
    return this.validationService.getErrorMessages(this.usernameRef, {
      required: 'Field is required',
      minlength: 'Field length must be at least 2 charachters',
      maxlength: 'Field is too long (more than 15 charachters)',
    });
  }

  get emailErrors(): string[] {
    return this.validationService.getErrorMessages(this.emailRef, {
      required: 'Field is required',
      email: 'Invalid email format',
      maxlength: 'Field is too long (more than 50 charachters)',
    });
  }

  get passwordErrors(): string[] {
    return this.validationService.getErrorMessages(this.passwordRef, {
      required: 'Password is required',
      minlength: 'Field length must be at least 8 charachters',
      maxlength: 'Field is too long (more than 100 charachters)',
    });
  }

  get passwordConfirmationErrors(): string[] {
    const formLevelErrors = this.validationService.getErrorMessages(this.registerFormRef, {
      confirmedPassword: 'doesnt match',
    });
    const fieldLevelErrors = this.validationService.getErrorMessages(this.passwordConfirmationRef, {
      required: 'Password confirmation is required',
      confirmedPassword: 'doesnt match',
    });
    return [...formLevelErrors, ...fieldLevelErrors];
  }
}
