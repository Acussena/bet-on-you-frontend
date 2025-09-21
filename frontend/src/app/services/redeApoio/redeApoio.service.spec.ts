import { TestBed } from '@angular/core/testing';

import { RedeApoioService } from './redeApoio.service';

describe('FalhaService', () => {
  let service: RedeApoioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedeApoioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
