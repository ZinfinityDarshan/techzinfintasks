import { TestBed } from '@angular/core/testing';

import { IdgeneratorService } from './idgenerator.service';

describe('IdgeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdgeneratorService = TestBed.get(IdgeneratorService);
    expect(service).toBeTruthy();
  });
});
