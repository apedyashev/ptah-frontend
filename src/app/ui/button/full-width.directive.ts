import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fullWidth]'
})
export class FullWidthDirective {
  
  constructor(el: ElementRef) {
    el.nativeElement.classList.add('block');
    el.nativeElement.classList.add('w-full');
  } 
}
