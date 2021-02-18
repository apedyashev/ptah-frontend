import { Directive, Input, ElementRef } from '@angular/core';

import { Color, ColorsMap } from './types';

@Directive({
  selector: '[app-ui-button]',
})
export class UiButtonDirective {
  @Input() color: Color = '';
  @Input() stroked: boolean = false;

  private defaultClasses = 'py-1 px-3 rounded text-center cursor-pointer focus:outline-none';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const { classList } = this.el.nativeElement;
    this.defaultClasses.split(' ').forEach((className) => {
      classList.add(className);
    });
    classList.add(this.colorClass());

    if (this.stroked) {
      classList.add('border');
      classList.add('border-gray-300');
      classList.add('hover:shadow');
    } else {
      classList.add('hover:bg-gray-50');
    }
  }

  colorClass(): string {
    const colorsMap: ColorsMap = {
      primary: 'text-blue-700',
      accent: 'text-red-700',
      '': 'text-current',
    };
    return colorsMap[this.color] || 'text-current';
  }
}
