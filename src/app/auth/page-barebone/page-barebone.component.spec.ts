import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBareboneComponent } from './page-barebone.component';

describe('PageBareboneComponent', () => {
  let component: PageBareboneComponent;
  let fixture: ComponentFixture<PageBareboneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBareboneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBareboneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
