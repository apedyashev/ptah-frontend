import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmedPasswordDirective } from './confirmed-password.directive';

@NgModule({
  declarations: [ConfirmedPasswordDirective],
  imports: [CommonModule],
  exports: [ConfirmedPasswordDirective],
})
export class SharedModule {}
