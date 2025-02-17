import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApPaidComponent } from './ap-paid.component';

describe('ApPaidComponent', () => {
  let component: ApPaidComponent;
  let fixture: ComponentFixture<ApPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
