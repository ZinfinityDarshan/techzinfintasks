import { TestBed } from '@angular/core/testing';

import { VenodorService } from './venodor.service';

describe('VenodorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenodorService = TestBed.get(VenodorService);
    expect(service).toBeTruthy();
  });
});
