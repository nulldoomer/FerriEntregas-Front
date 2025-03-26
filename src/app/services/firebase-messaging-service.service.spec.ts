import { TestBed } from '@angular/core/testing';

import { FirebaseMessagingServiceService } from './firebase-messaging-service.service';

describe('FirebaseMessagingServiceService', () => {
  let service: FirebaseMessagingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseMessagingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
