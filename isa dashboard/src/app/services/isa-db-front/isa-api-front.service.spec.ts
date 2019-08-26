import { TestBed } from '@angular/core/testing';

import { IsaApiFrontService } from './isa-api-front.service';

describe('IsaApiFrontService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsaApiFrontService = TestBed.get(IsaApiFrontService);
    expect(service).toBeTruthy();
  });
});
