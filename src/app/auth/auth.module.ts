import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UiButtonModule } from '../ui/button/button.module';
import { UiInputModule } from '../ui/input/input.module';
import { UiCardModule } from '../ui/card/card.module';
import { UiSharedModule } from '../ui/shared/shared.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
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
  exports: [RegisterPageComponent],
  providers: [AuthService],
})
export class AuthModule {}
