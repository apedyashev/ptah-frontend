import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EmailConfirmationRequest } from './email-confirmation-request.model';
// services
import { AuthService } from '../auth.service';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-email-confirmation-page',
  templateUrl: './email-confirmation-page.component.html',
})
export class EmailConfirmationPageComponent implements OnInit {
  @ViewChild('token', { static: true }) tokenRef!: NgModel;
  model = new EmailConfirmationRequest();
  serverResponseError: string = '';

  constructor(private authService: AuthService, private validationService: ValidationService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('this.model', this.model);
    this.authService.confirmEmail(this.model.token).subscribe({
      next() {
        console.log('logged in');
      },
      error: ({ message, errors }) => {
        this.validationService.setServerErrorsToFields(this, errors);
        this.serverResponseError = message;
      },
    });
  }

  get emailToBeConfirmed(): string | null {
    return this.authService.getEmailToBeConfirmed();
  }

  get tokenErrors() {
    return this.validationService.getErrorMessages(this.tokenRef, {
      required: 'Confirmation code is required',
    });
  }
}
