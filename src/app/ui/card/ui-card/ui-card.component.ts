import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.component.html',
})
export class UiCardComponent implements OnInit {
  @Input() padding: number = 2
  constructor() { }

  ngOnInit(): void {
  }

  get paddingClass(): string {
    return `p-${this.padding}`;
  }

}
