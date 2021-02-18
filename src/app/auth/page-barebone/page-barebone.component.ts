import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-barebone',
  templateUrl: './page-barebone.component.html',
})
export class PageBareboneComponent implements OnInit {
  @Input() serverResponseError: string = '';
  constructor() {}

  ngOnInit(): void {}
}
