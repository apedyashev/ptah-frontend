import { Directive, Input, ElementRef } from '@angular/core';

// TODO: put to a .d.ts file
type Colors = 'primary' | 'accent' | ''
type ColorsMap = {
  // mapped object type
  [key in Colors]: string
}


@Directive({
  selector: '[app-ui-button-raised]'
})
export class UiButtonRaisedDirective {
  @Input() color: Colors = '';


  private defaultClasses = 'py-1 px-3 border border-gray-300 rounded text-white text-center cursor-pointer focus:outline-none hover:shadow'

  constructor(private el: ElementRef) {} 

  ngOnInit() {
   const { classList }  = this.el.nativeElement
    this.defaultClasses.split(' ').forEach((className) => {
      classList.add(className);
    })
    classList.add(this.colorClass());
  }

  colorClass(): string {
    const bgColorsMap: ColorsMap = {
      primary: 'bg-blue-800',
      accent: 'bg-red-500',
      '': ''
    }
    
    return bgColorsMap[this.color] || 'text-current';
  }

}
