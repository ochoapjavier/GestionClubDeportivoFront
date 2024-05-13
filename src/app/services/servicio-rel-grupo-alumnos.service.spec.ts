import { TestBed } from '@angular/core/testing';

import { ServicioRelGrupoAlumnosService } from './servicio-rel-grupo-alumnos.service';

describe('ServicioRelGrupoAlumnosService', () => {
  let service: ServicioRelGrupoAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioRelGrupoAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
