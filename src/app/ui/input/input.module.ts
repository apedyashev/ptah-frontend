import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiInputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UiInputComponent],
  imports: [
    CommonModule, 
    FormsModule
  ],
  exports: [UiInputComponent]
})
export class UiInputModule { }
