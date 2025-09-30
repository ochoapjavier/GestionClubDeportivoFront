import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: Router;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'dashboard/:id', component: DashboardComponent }
        ])
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un formulario de login', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('debería validar el campo email', () => {
    const email = component.loginForm.get('email');
    
    // Email vacío
    email?.setValue('');
    expect(email?.valid).toBeFalsy('debería ser inválido cuando está vacío');
    
    // Email con formato inválido
    email?.setValue('email-invalido');
    expect(email?.valid).toBeFalsy('debería ser inválido con formato incorrecto');
    
    // Email con formato válido
    email?.setValue('usuario@ejemplo.com');
    expect(email?.valid).toBeTruthy('debería ser válido con formato correcto');
  });

  it('debería validar el campo contraseña', () => {
    const password = component.loginForm.get('password');
    
    // Contraseña vacía
    password?.setValue('');
    expect(password?.valid).toBeFalsy('debería ser inválida cuando está vacía');
    
    // Contraseña con contenido
    password?.setValue('12345');
    expect(password?.valid).toBeTruthy('debería ser válida cuando tiene contenido');
  });

  it('debería marcar el formulario como inválido cuando está vacío', () => {
    expect(component.loginForm.valid).toBeFalsy('el formulario debería ser inválido cuando está vacío');
  });

  it('debería marcar el formulario como válido cuando los campos están completos', () => {
    component.loginForm.get('email')?.setValue('usuario@ejemplo.com');
    component.loginForm.get('password')?.setValue('password123');
    
    expect(component.loginForm.valid).toBeTruthy('el formulario debería ser válido cuando los campos están completos');
  });

  it('debería llamar a authService.login y navegar al dashboard en un login exitoso', () => {
    // Preparamos el mock para que devuelva un usuario exitoso
    const mockUserId = 1;
    mockAuthService.login.and.returnValue(of(mockUserId));
    spyOn(mockRouter, 'navigate'); // Espiamos el método navigate del router

    // Rellenamos el formulario
    component.loginForm.get('email')?.setValue('usuario@ejemplo.com');
    component.loginForm.get('password')?.setValue('password123');

    // Llamamos al método de envío
    component.login();

    // Verificamos que el servicio fue llamado con los datos correctos
    expect(mockAuthService.login).toHaveBeenCalledWith('usuario@ejemplo.com', 'password123');

    // Verificamos que se navegó a la ruta correcta
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard', mockUserId]);
  });

  it('debería mostrar un mensaje de error en un login fallido', () => {
    mockAuthService.login.and.returnValue(throwError(() => ({ status: 401 })));
    component.login();
    expect(component.loginResp).toBe(false);
  });
});
