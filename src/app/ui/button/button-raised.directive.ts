import { Directive, Input, ElementRef } from '@angular/core';
import _values from 'lodash/values';
import { Color, ColorsMap } from './types';
@Directive({
  selector: '[app-ui-button-raised]',
})
export class UiButtonRaisedDirective {
  @Input() color: Color = '';

  private defaultClasses = `py-1 px-3 border border-gray-300 rounded text-white text-center focus:outline-none hover:shadow`;
  private colorClassesMap = {
    primaryEnabled: 'bg-blue-800 cursor-pointer',
    primaryDisabled: 'bg-blue-300 cursor-default',
    accentEnabled: 'bg-red-500 cursor-pointer',
    accentDisabled: 'bg-red-200 cursor-default',
    default: 'text-current',
  };

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  // NOTE: without setter the directive reacts to the 'disabled' changes (ngOnChanges is called),
  // but the button will be always enabled
  @Input('disabled')
  set disabled(value: boolean) {
    if (value) {
      this.el.nativeElement.setAttribute('disabled', value);
      this.setClasses(value);
    } else {
      this.el.nativeElement.removeAttribute('disabled');
      this.setClasses(false);
    }
  }

  setClasses(disabled: boolean) {
    const { classList } = this.el.nativeElement;
    // add static classes
    this.defaultClasses.split(' ').forEach((className) => {
      classList.add(className);
    });

    // remove the dynamic classes before updating them
    _values(this.colorClassesMap).forEach((currentClassList: string) => {
      this.removeClasses(currentClassList);
    });

    // add dynamic classes
    this.addClasses(this.colorClasses(disabled));
  }

  colorClasses(disabled: boolean): string {
    const { color, colorClassesMap } = this;
    const bgColorsMap: ColorsMap = {
      primary: disabled ? colorClassesMap.primaryDisabled : colorClassesMap.primaryEnabled,
      accent: disabled ? colorClassesMap.accentDisabled : colorClassesMap.accentEnabled,
      '': '',
    };

    return bgColorsMap[color] || colorClassesMap.default;
  }

  addClasses(classes: string) {
    const { classList } = this.el.nativeElement;
    classes.split(' ').forEach((currentClass: string) => {
      classList.add(currentClass);
    });
  }

  removeClasses(classes: string) {
    const { classList } = this.el.nativeElement;
    classes.split(' ').forEach((currentClass: string) => {
      classList.remove(currentClass);
    });
  }
}
