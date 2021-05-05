import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  templateUrl: './card.component.html',
})
export class UiCardComponent implements OnInit {
  @Input() padding: number = 2;
  @Input() classNames: string = '';
  @ViewChild('footer', { read: ElementRef, static: true }) footer!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  get paddingClass(): string {
    return `p-${this.padding}`;
  }

  get isFooterEmpty() {
    return !this.footer.nativeElement.innerHTML;
  }
}
