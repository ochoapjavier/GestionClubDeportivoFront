/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicioSnackbar.serviceService } from './servicio-snackbar.service.service';

describe('Service: ServicioSnackbar.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioSnackbar.serviceService]
    });
  });

  it('should ...', inject([ServicioSnackbar.serviceService], (service: ServicioSnackbar.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
