import { TestBed } from '@angular/core/testing';

import { ServicioDiasGruposService } from './servicio-dias-grupos.service';

describe('ServicioDiasGruposService', () => {
  let service: ServicioDiasGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDiasGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
