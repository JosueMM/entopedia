import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InintialMenuComponent } from './inintial-menu.component';

describe('InintialMenuComponent', () => {
  let component: InintialMenuComponent;
  let fixture: ComponentFixture<InintialMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InintialMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InintialMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
