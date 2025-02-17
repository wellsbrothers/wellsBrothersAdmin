import { TestBed } from '@angular/core/testing';

import { TrackboardService } from './trackboard.service';

describe('TrackboardService', () => {
  let service: TrackboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
