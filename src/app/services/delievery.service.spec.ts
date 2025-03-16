import { TestBed } from '@angular/core/testing';

import { DelieveryService } from './delievery.service';

describe('DelieveryService', () => {
  let service: DelieveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelieveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
