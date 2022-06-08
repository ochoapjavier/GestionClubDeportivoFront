import { TestBed } from '@angular/core/testing';

import { ServicioSuperficiesService } from './servicio-superficies.service';

describe('ServicioSuperficiesService', () => {
  let service: ServicioSuperficiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioSuperficiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
