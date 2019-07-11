import { TestBed } from '@angular/core/testing';

import { ChongshengdeService } from './chongshengde.service';

describe('ChongshengdeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChongshengdeService = TestBed.get(ChongshengdeService);
    expect(service).toBeTruthy();
  });
});
