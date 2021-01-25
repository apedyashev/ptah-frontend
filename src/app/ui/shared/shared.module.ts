import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullWidthBlockDirective } from './full-width-block.directive';


@NgModule({
  declarations: [FullWidthBlockDirective],
  imports: [
    CommonModule
  ],
  exports: [FullWidthBlockDirective]
})
export class UiSharedModule { }
