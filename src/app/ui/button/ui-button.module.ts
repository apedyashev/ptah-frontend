import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './ui-button/ui-button.component';

@NgModule({
  declarations: [UiButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [UiButtonComponent]
})
export class UiButtonModule { }
