import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './servicio-snackbar.service.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SnackbarService]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackbar open method', () => {
    const message = 'Test message';
    const action = 'Test action';
    const duration = 5000;
    
    const spy = spyOn(service['snackBar'], 'open');
    service.showSnackbar(message, action, duration);
    
    expect(spy).toHaveBeenCalledWith(message, action, { duration });
  });
});
