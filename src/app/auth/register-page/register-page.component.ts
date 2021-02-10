import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RegisterRequest } from './register-request.model';
import _map from 'lodash/map';
import { AuthService } from '../auth.service';

// TODO: put into .d.ts
type ErrorMessages = {
  [key in string]: string
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {
  @ViewChild('username', { static: true }) usernameRef!: NgModel;
  @ViewChild('email', { static: true }) emailRef!: NgModel;
  @ViewChild('password', { static: true }) passwordRef!: NgModel;
  @ViewChild('passwordConfirmation', { static: true }) passwordConfirmationRef!: NgModel;
  model = new RegisterRequest();
  serverResponseError: string = ''

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.model)
    this.authService.register(this.model).subscribe({
      next() { 
        // TODO: show success message
        console.log('registered in'); 
      },
      error: (err) => { 
        for(let fieldName in err.errors) {
          const fieldRefName = `${fieldName}Ref`
          const fieldRef = (this as any)[fieldRefName]
          if (fieldRef) {
            fieldRef.control.setErrors({
              areServerErrors: true,
              errors: err.errors[fieldName]
            })
          } else {
            console.error(`${fieldRefName} not found`);
          }
        }
        
        this.serverResponseError = err.message
      }
    })
  }

  get userNameErrors(): string[] {
    return  this.getErrorMessages(this.usernameRef, {
      required: 'Field is required',
    }) 
  }

  get emailErrors(): string[]  {
    return this.getErrorMessages(this.emailRef, {
      required: 'Field is required',
      email: 'Invalid email format'
    });
  }

  get passwordErrors(): string[] {
    return this.getErrorMessages(this.passwordRef, {
      required: 'Password is required',
    });
  }

  get passwordConfirmationErrors(): string[] {
    return this.getErrorMessages(this.passwordConfirmationRef, {
      required: 'Password confirmation is required',
    });
  }

  // TODO: service?
  getErrorMessages(elementRef: NgModel, errorMessages: ErrorMessages): string[] {
    const {dirty, control: {errors}} = elementRef;

    let messages: string[] = [];
    if (errors?.areServerErrors) {
      messages = errors.errors;
    } else {
      if (dirty && errors) {
        messages = _map(errors, (value: boolean, ruleName: string) => errorMessages[ruleName]) as unknown as string[];
      }
    }
    
    return messages;
  }
}
