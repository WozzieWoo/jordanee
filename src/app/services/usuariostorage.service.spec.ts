import { TestBed } from '@angular/core/testing';

import { UsuariostorageService } from './usuariostorage.service';

describe('UsuariostorageService', () => {
  let service: UsuariostorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariostorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
