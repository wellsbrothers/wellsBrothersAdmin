import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateConfirmationComponentNew } from './rate-confirmation.component';

describe('RateConfirmationComponentNew', () => {
  let component: RateConfirmationComponentNew;
  let fixture: ComponentFixture<RateConfirmationComponentNew>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RateConfirmationComponentNew],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateConfirmationComponentNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
