import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepersComponent } from './sheepers.component';

describe('SheepersComponent', () => {
  let component: SheepersComponent;
  let fixture: ComponentFixture<SheepersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheepersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheepersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
