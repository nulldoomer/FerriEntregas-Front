import { TestBed } from '@angular/core/testing';

import { EvidenciasService } from './evidencias.service';

describe('EvidenciasService', () => {
  let service: EvidenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
