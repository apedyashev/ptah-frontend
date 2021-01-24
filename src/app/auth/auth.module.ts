import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ButtonModule } from '../ui/button/ui-button.module';
import { InputModule } from '../ui/input/input.module';
import { CardModule } from '../ui/card/card.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    InputModule,
    CardModule
  ]
})
export class AuthModule { }
