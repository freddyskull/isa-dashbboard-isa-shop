import { TestBed } from '@angular/core/testing';

import { IsaBackendDataService } from './isa-backend-data.service';

describe('IsaBackendDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsaBackendDataService = TestBed.get(IsaBackendDataService);
    expect(service).toBeTruthy();
  });
});
