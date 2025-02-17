import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateConfirmationComponent } from './rate-confirmation.component';

describe('RateConfirmationComponent', () => {
  let component: RateConfirmationComponent;
  let fixture: ComponentFixture<RateConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
