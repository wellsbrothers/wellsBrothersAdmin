import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApTbpComponent } from './ap-tbp.component';

describe('ApTbpComponent', () => {
  let component: ApTbpComponent;
  let fixture: ComponentFixture<ApTbpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApTbpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTbpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
