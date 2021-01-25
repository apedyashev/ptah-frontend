import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullWidthDirective } from './full-width.directive';
import { UiButtonDirective } from './ui-button.directive';
import { UiButtonRaisedDirective } from './ui-button-raised.directive';

@NgModule({
  declarations: [FullWidthDirective, UiButtonDirective, UiButtonRaisedDirective],
  imports: [
    CommonModule
  ],
  exports: [FullWidthDirective, UiButtonDirective, UiButtonRaisedDirective]
})
export class ButtonModule { }
