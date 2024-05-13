import { TestBed } from '@angular/core/testing';

import { ServicioTorneosService } from './servicio-torneos.service';

describe('ServicioTorneosService', () => {
  let service: ServicioTorneosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTorneosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
