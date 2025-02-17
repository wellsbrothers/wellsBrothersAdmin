import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackboardComponent } from './trackboard.component';

describe('TrackboardComponent', () => {
  let component: TrackboardComponent;
  let fixture: ComponentFixture<TrackboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
