import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonRaisedComponent } from './ui-button-raised.component';

describe('UiButtonRaisedComponent', () => {
  let component: UiButtonRaisedComponent;
  let fixture: ComponentFixture<UiButtonRaisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiButtonRaisedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiButtonRaisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
