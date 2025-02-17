import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfactoryComponent } from './editfactory.component';

describe('EditfactoryComponent', () => {
  let component: EditfactoryComponent;
  let fixture: ComponentFixture<EditfactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
