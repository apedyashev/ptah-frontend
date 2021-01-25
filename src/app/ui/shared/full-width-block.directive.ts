import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[full-width-block]'
})
export class FullWidthBlockDirective {
  
  constructor(el: ElementRef) {
    el.nativeElement.classList.add('block');
    el.nativeElement.classList.add('w-full');
  } 
}
