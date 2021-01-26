import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  templateUrl: './input.component.html',
})
export class UiInputComponent implements OnInit {
  @Input() fullWidth: boolean = false
  @Input() type: string = 'text'
  @Input() name: string = ''
  @Input() label: string = ''
  @Input() errors: string[] = []

  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private isFocused: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  get flexClass(): string {
    return this.fullWidth ? 'flex' : 'inline-flex'
  }

  get borderClass(): string {
    if (this.errors?.length) {
      return this.isFocused ? 'border-red-400' : 'border-red-300'
    } 
    return this.isFocused ? 'border-gray-400' : 'border-gray-300'
    
  }

  get bgClass(): string {
    return this.errors?.length ? 'bg-red-200' : 'bg-gray-50'
  }

  onFocus() {
    this.isFocused = true
  }

  onBlur() {
    this.isFocused = false
  }

  onChange( ) {
    this.valueChange.emit(this.value)
  }
}
