import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
})
export class UiInputComponent implements OnInit {
  @Input() fullWidth: boolean = false
  @Input() type: string = 'text'
  @Input() name: string = ''
  @Input() label: string = ''
  @Input() error: string = ''

  private isFocused: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  get flexClass(): string {
    return this.fullWidth ? 'flex' : 'inline-flex'
  }

  get borderClass(): string {
    if (this.error) {
      return this.isFocused ? 'border-red-400' : 'border-red-300'
    } 
    return this.isFocused ? 'border-gray-400' : 'border-gray-300'
    
  }

  get bgClass(): string {
    return this.error ? 'bg-red-200' : 'bg-gray-50'
  }

  onFocus() {
    this.isFocused = true
  }

  onBlur() {
    this.isFocused = false
  }
}
