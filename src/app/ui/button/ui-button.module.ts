import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './ui-button/ui-button.component';
import { UiButtonRaisedComponent } from './ui-button-raised/ui-button-raised.component';

@NgModule({
  declarations: [UiButtonComponent, UiButtonRaisedComponent],
  imports: [
    CommonModule
  ],
  exports: [UiButtonComponent, UiButtonRaisedComponent]
})
export class UiButtonModule { }
