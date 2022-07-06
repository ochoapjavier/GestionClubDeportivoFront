import { TestBed } from '@angular/core/testing';

import { ServicioRelCompeticionesUsuarioService } from './servicio-rel-competiciones-usuario.service';

describe('ServicioRelCompeticionesUsuarioService', () => {
  let service: ServicioRelCompeticionesUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioRelCompeticionesUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
