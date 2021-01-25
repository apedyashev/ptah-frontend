import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiButtonDirective } from './button.directive';
import { UiButtonRaisedDirective } from './button-raised.directive';

@NgModule({
  declarations: [UiButtonDirective, UiButtonRaisedDirective],
  imports: [
    CommonModule
  ],
  exports: [UiButtonDirective, UiButtonRaisedDirective]
})
export class UiButtonModule { }
