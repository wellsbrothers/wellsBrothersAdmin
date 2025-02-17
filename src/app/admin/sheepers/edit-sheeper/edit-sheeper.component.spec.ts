import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSheeperComponent } from './edit-sheeper.component';

describe('EditSheeperComponent', () => {
  let component: EditSheeperComponent;
  let fixture: ComponentFixture<EditSheeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSheeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSheeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
