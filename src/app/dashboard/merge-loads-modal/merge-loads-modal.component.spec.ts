import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeLoadsModalComponent } from './merge-loads-modal.component';

describe('MergeLoadsModalComponent', () => {
  let component: MergeLoadsModalComponent;
  let fixture: ComponentFixture<MergeLoadsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeLoadsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeLoadsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
