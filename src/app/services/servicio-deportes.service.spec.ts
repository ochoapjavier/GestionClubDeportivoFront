import { TestBed } from '@angular/core/testing';

import { ServicioDeportesService } from './servicio-deportes.service';

describe('ServicioDeportesService', () => {
  let service: ServicioDeportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDeportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
