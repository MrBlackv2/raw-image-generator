import { TestBed } from '@angular/core/testing';

import { SdClientService } from './sd-client.service';

describe('SdClientService', () => {
  let service: SdClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
