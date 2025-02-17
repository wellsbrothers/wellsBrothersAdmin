import { TestBed } from '@angular/core/testing';

import { ConsigneesService } from './consignees.service';

describe('ConsigneesService', () => {
  let service: ConsigneesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsigneesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
