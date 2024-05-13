import { TestBed } from '@angular/core/testing';

import { ServicioGruposService } from './servicio-grupos.service';

describe('ServicioGruposService', () => {
  let service: ServicioGruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioGruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
