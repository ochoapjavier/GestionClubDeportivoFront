import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormUsuarioComponent } from './form-usuario.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { Usuario } from '../../models/usuario';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Directive, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

// Mock RouterLink
@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

// Mock component for router-outlet
@Component({ template: '' })
class DummyComponent {}

describe('FormUsuarioComponent', () => {
  let component: FormUsuarioComponent;
  let fixture: ComponentFixture<FormUsuarioComponent>;
  let mockUsuarioService: jasmine.SpyObj<ServicioUsuarioService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  // Sample user for testing
  const mockUsuario = new Usuario();
  mockUsuario.id = 1;
  mockUsuario.nombre = 'Test';
  mockUsuario.email = 'test@example.com';
  mockUsuario.rol = 'usuario';

  beforeEach(async () => {
    // Create mocks
    mockUsuarioService = jasmine.createSpyObj('ServicioUsuarioService', 
      ['create', 'update', 'getById']);
    
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
        // Configure ActivatedRoute mock with proper params observable
    mockActivatedRoute = {
      snapshot: {
        queryParams: { rol: 'USUARIO', userID: '0' },
        paramMap: convertToParamMap({})
      },
      params: of({}),
      queryParams: of({ rol: 'USUARIO', userID: '0' })
    };
    
    // Spy on params to control it in tests
    spyOnProperty(mockActivatedRoute, 'params').and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ 
        FormUsuarioComponent,
        DummyComponent,
        RouterLinkDirectiveStub // Add the mock directive
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/:id', component: DummyComponent }
        ]),
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ServicioUsuarioService, useValue: mockUsuarioService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    // Create component
    fixture = TestBed.createComponent(FormUsuarioComponent);
    component = fixture.componentInstance;
    
    // Initialize the component
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con campos vacíos', () => {
    expect(component.regForm).toBeDefined();
    expect(component.regForm.get('nombre')?.value).toBe('');
    expect(component.regForm.get('email')?.value).toBe('');
    expect(component.regForm.get('password')?.value).toBe('');
  });

  it('debería marcar el formulario como inválido cuando está vacío', () => {
    expect(component.regForm.valid).toBeFalsy();
  });

  it('debería validar el formato de email', () => {
    const email = component.regForm.get('email');
    email?.setValue('invalid-email');
    expect(email?.valid).toBeFalsy();
    
    email?.setValue('valid@example.com');
    expect(email?.valid).toBeTruthy();
  });

  it('debería llamar a create() y navegar al dashboard cuando se envía el formulario', fakeAsync(() => {
    // Configure mock response
    const mockResponse = new Usuario();
    mockResponse.id = 1;
    mockResponse.email = 'test@example.com';
    mockResponse.nombre = 'Test';
    mockResponse.rol = 'usuario';
    
    mockUsuarioService.create.and.returnValue(of(mockResponse));
    
    // Fill the form
    component.regForm.patchValue({
      nombre: 'Test',
      apellido1: 'User',
      email: 'test@example.com',
      password: 'password123',
      rol: 'usuario',
      terminos: true
    });
    
    // Call create()
    component.create();
    tick();
    
    // Verify service was called
    expect(mockUsuarioService.create).toHaveBeenCalled();
    
    // Verify navigation
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard', 1]);
  }));

  it('debería manejar errores al crear un usuario', fakeAsync(() => {
    // Configure error response
    const errorResponse = { status: 409 };
    mockUsuarioService.create.and.returnValue(throwError(() => errorResponse));
    
    // Fill the form
    component.regForm.patchValue({
      nombre: 'Test',
      apellido1: 'User',
      email: 'existente@example.com',
      password: 'password123',
      rol: 'usuario',
      terminos: true
    });
    
    // Call create()
    component.create();
    tick();
    
    // Verify error handling
    expect(component.errorMessage).toBeTruthy();
  }));

  it('debería cargar los datos del usuario cuando se proporciona un ID', fakeAsync(() => {
    // Configure route with ID
    const testId = 1;
    
    // Recreate component first
    fixture = TestBed.createComponent(FormUsuarioComponent);
    component = fixture.componentInstance;
    
    // Set up the service to return our test user
    mockUsuarioService.getById.and.returnValue(of(mockUsuario));
    
    // Trigger the params observable with our test ID
    (mockActivatedRoute as any).params = of({ id: testId });
    
    // Trigger change detection and wait for async operations
    fixture.detectChanges();
    tick();
    
    // Verify the service was called with the correct ID
    expect(mockUsuarioService.getById).toHaveBeenCalledWith(testId);
    
    // Verify user data was loaded into the form
    expect(component.regForm.get('nombre')?.value).toBe('Test');
    expect(component.regForm.get('email')?.value).toBe('test@example.com');
  }));

  it('debería actualizar un usuario existente', fakeAsync(() => {
    // Set up component in edit mode with ID
    const testId = 1;
    mockActivatedRoute.snapshot.paramMap = convertToParamMap({ id: testId });
    
    // Configure the service to return our test user
    mockUsuarioService.getById.and.returnValue(of(mockUsuario));
    mockUsuarioService.update.and.returnValue(of(mockUsuario));
    
    // Recreate component to trigger ngOnInit with the ID
    fixture = TestBed.createComponent(FormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    
    // Update the form
    component.regForm.patchValue({
      nombre: 'Updated',
      apellido1: 'User',
      email: 'updated@example.com',
      rol: 'usuario'
    });
    
    // Call update
    component.update();
    tick();
    
    // Verify update was called with the form data
    expect(mockUsuarioService.update).toHaveBeenCalledWith(jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard', testId]);
  }));
});