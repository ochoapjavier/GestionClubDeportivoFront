import { TestBed } from '@angular/core/testing';

import { ServicioHorariosService } from './servicio-horarios.service';

describe('ServicioHorariosService', () => {
  let service: ServicioHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
