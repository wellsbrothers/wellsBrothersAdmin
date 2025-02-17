import { TestBed } from '@angular/core/testing';

import { SheepersService } from './sheepers.service';

describe('SheepersService', () => {
  let service: SheepersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheepersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
