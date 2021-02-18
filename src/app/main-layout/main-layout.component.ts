import { Component, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnDestroy {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'bg-gray-100');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-gray-100');
  }
}
