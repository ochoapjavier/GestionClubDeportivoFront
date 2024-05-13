import { TestBed } from '@angular/core/testing';

import { ServicioSesionesService } from './servicio-sesiones.service';

describe('ServicioSesionesService', () => {
  let service: ServicioSesionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioSesionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
