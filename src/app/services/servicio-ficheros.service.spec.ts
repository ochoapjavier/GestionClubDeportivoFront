import { TestBed } from '@angular/core/testing';

import { ServicioFicherosService } from './servicio-ficheros.service';

describe('ServicioFicherosService', () => {
  let service: ServicioFicherosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioFicherosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
