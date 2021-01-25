import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiInputComponent } from './input/input.component';

@NgModule({
  declarations: [UiInputComponent],
  imports: [
    CommonModule
  ],
  exports: [UiInputComponent]
})
export class UiInputModule { }
