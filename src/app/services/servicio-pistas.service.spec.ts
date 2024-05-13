import { TestBed } from '@angular/core/testing';

import { ServicioPistasService } from './servicio-pistas.service';

describe('ServicioPistasService', () => {
  let service: ServicioPistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
