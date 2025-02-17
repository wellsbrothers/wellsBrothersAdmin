import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSheeperComponent } from './add-sheeper.component';

describe('AddSheeperComponent', () => {
  let component: AddSheeperComponent;
  let fixture: ComponentFixture<AddSheeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSheeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSheeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
