import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UiButtonModule } from '../ui/button/button.module';
import { UiInputModule } from '../ui/input/input.module';
import { UiCardModule } from '../ui/card/card.module';
import { UiSharedModule } from '../ui/shared/shared.module';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    UiButtonModule,
    UiInputModule,
    UiCardModule,
    UiSharedModule
  ],
  exports: [RegisterPageComponent]
})
export class AuthModule { }
