import { TestBed } from '@angular/core/testing';

import { InfoDiscussionService } from './info-discussion.service';

describe('InfoDiscussionService', () => {
  let service: InfoDiscussionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDiscussionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
