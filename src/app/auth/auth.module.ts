import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

import { EmailConfirmationPageComponent } from './email-confirmation-page/email-confirmation-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageBareboneComponent } from './page-barebone/page-barebone.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UiButtonModule } from '../ui/button/button.module';
import { UiInputModule } from '../ui/input/input.module';
import { UiCardModule } from '../ui/card/card.module';
import { UiSharedModule } from '../ui/shared/shared.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    EmailConfirmationPageComponent,
    PageBareboneComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    UiButtonModule,
    UiInputModule,
    UiCardModule,
    UiSharedModule,
    SharedModule,
  ],
  exports: [],
  providers: [AuthService],
})
export class AuthModule {}
