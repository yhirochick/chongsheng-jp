import { TestBed } from '@angular/core/testing';
import { ChongshengdeService } from './chongshengde.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ChongshengdeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: ChongshengdeService = TestBed.get(ChongshengdeService);
    expect(service).toBeTruthy();
  });
});
