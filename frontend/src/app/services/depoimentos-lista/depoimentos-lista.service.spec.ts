import { TestBed } from '@angular/core/testing';

import { DepoimentosListaService } from './depoimentos-lista.service';

describe('Depoimentos-lista', () => {
  let service: DepoimentosListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepoimentosListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
