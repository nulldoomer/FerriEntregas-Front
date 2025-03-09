import { TestBed } from '@angular/core/testing';

import { OrsService } from './ors.service';

describe('OrsService', () => {
  let service: OrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
