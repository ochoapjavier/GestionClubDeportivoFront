import { TestBed } from '@angular/core/testing';

import { ServicioEstadosService } from './servicio-estados.service';

describe('ServicioEstadosService', () => {
  let service: ServicioEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
