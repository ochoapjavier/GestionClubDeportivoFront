import { TestBed } from '@angular/core/testing';

import { ServicioTipoCompeticionesService } from './servicio-tipo-competiciones.service';

describe('ServicioTipoCompeticionesService', () => {
  let service: ServicioTipoCompeticionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTipoCompeticionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
