import { TestBed } from '@angular/core/testing';

import { FiremesgService } from './firemesg.service';

describe('FiremesgService', () => {
  let service: FiremesgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiremesgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
