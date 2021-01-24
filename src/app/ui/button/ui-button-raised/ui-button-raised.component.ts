import { Component, OnInit, Input } from '@angular/core';

// TODO: put to a .d.ts file
type Colors = 'primary' | 'accent' | ''
type ColorsMap = {
  // mapped object type
  [key in Colors]: string
}

@Component({
  selector: 'app-ui-button-raised',
  templateUrl: './ui-button-raised.component.html',
})
export class UiButtonRaisedComponent implements OnInit {
  @Input() color: Colors = '';

  constructor() { }

  ngOnInit(): void {
  }

  get bgColorClass(): string {
    // TODO: refactor - service?
    const bgColorsMap: ColorsMap = {
      primary: 'bg-blue-800',
      accent: 'bg-red-500',
      '': ''
    }
    return bgColorsMap[this.color] || 'text-current';
  }
}
