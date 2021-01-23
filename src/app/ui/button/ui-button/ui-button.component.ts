import { Component, OnInit, Input } from '@angular/core';

// TODO: put to a .d.ts file
type Colors = 'primary' | 'accent' | ''
type ColorsMap = {
  // mapped object type
  [key in Colors]: string
}
@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
})
export class UiButtonComponent implements OnInit {
  @Input() color: Colors = '';

  constructor() { }

  ngOnInit(): void {
  }

  get colorClass(): string {
    const colorsMap: ColorsMap = {
      primary: 'text-blue-700',
      accent: 'text-red-700',
      '': 'text-current'
    }
    return colorsMap[this.color] || 'text-current';
  }
}
