import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { Component, Input } from '@angular/core';

// Componentes
import { DashboardComponent } from './dashboard.component';

// Servicios
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { ServicioFicherosService } from '../services/servicio-ficheros.service';

// Modelos
import { Usuario } from 'src/models/usuario';

// Angular Material necesarios por el template
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';
import { Competicion } from 'src/models/competicion';
import { Reserva } from 'src/models/reserva';
import { Fichero } from 'src/models/fichero';

// Mocks para componentes hijos usados en el template
@Component({ selector: 'app-grupo', template: '' })
class MockGrupoComponent {
  @Input() grupos: any;
  @Input() usuario: any;
}

@Component({ selector: 'app-sesion', template: '' })
class MockSesionComponent {
  @Input() sesiones: any;
  @Input() usuario: any;
}

@Component({ selector: 'app-torneo', template: '' })
class MockTorneoComponent {
  @Input() competiciones: any;
  @Input() usuario: any;
  @Input() inscripcionEnabled?: boolean;
}

@Component({ selector: 'app-reserva', template: '' })
class MockReservaComponent {
  @Input() reservas: any;
  @Input() usuario: any;
}

describe('DashboardComponent Integration Tests', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockFicherosService: jasmine.SpyObj<ServicioFicherosService>;
  let mockUsuarioService: jasmine.SpyObj<ServicioUsuarioService>;

  const mockUsuario: Usuario = {
    id: 1,
    nombre: 'Test',
    id_fichero: 0,
    email: 'test@example.com',
    password: 'password',
    apellido1: 'Apellido1',
    apellido2: 'Apellido2',
    rol: 'Usuario',
    terminos: 1,
    privacidad: 1,
    comercial: 1,
  };

  beforeEach(async () => {
    mockFicherosService = jasmine.createSpyObj('ServicioFicherosService', ['upload', 'getFile']);
    mockUsuarioService = jasmine.createSpyObj('ServicioUsuarioService', ['update', 'getByRol', 'getById']);

    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockGrupoComponent,
        MockSesionComponent,
        MockTorneoComponent,
        MockReservaComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatDividerModule,
        MatButtonModule
      ],
      providers: [
        { provide: ServicioFicherosService, useValue: mockFicherosService },
        { provide: ServicioUsuarioService, useValue: mockUsuarioService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // Simulamos respuestas para los métodos usados
    mockUsuarioService.getByRol.and.returnValue(of([]));
    mockUsuarioService.getById.and.returnValue(of(mockUsuario));

    fixture.detectChanges();
  });

  afterEach(() => {
    mockFicherosService.upload.calls.reset();
    mockUsuarioService.update.calls.reset();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería manejar la subida de archivos y recargar la página', fakeAsync(() => {
    const uploadedFileResponse = {
      fileName: 'test.png',
      fileDownloadUri: 'http://example.com/test.png',
      fileType: 'image/png',
      size: 100,
      fileID: 1001
    };

    mockFicherosService.upload.and.returnValue(of(uploadedFileResponse));

    const usuarioActualizado: Usuario = { ...mockUsuario, id_fichero: uploadedFileResponse.fileID };
    mockUsuarioService.update.and.returnValue(of(usuarioActualizado));

    spyOn(window, 'alert');
    const reloadSpy = spyOn(component as any, 'reloadPage').and.stub();

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const mockEvent = { currentTarget: { files: [file] } } as unknown as Event;

    component.uploadFile(mockEvent, { ...mockUsuario, id_fichero: 0 });
    tick();

    expect(mockFicherosService.upload).toHaveBeenCalledWith(file);
    expect(mockUsuarioService.update).toHaveBeenCalledWith(jasmine.objectContaining({ id_fichero: 1001 }));
    expect(window.alert).toHaveBeenCalledWith('Imagen test.png subido correctamente para el usuario Test');
    expect(reloadSpy).toHaveBeenCalled();
  }));

  it('debería no hacer nada si no se selecciona ningún archivo', fakeAsync(() => {
    const mockEvent = { currentTarget: { files: [] } } as unknown as Event;

    const reloadSpy = spyOn(component as any, 'reloadPage').and.stub();

    component.uploadFile(mockEvent, { ...mockUsuario, id_fichero: 0 });
    tick();

    expect(mockFicherosService.upload).not.toHaveBeenCalled();
    expect(mockUsuarioService.update).not.toHaveBeenCalled();
    expect(reloadSpy).not.toHaveBeenCalled();
  }));

  it('debería manejar el errora alertar error si la subida falla', fakeAsync(() => {
    mockFicherosService.upload.and.returnValue(throwError(() => new Error('Upload failed')));

    spyOn(window, 'alert');
    const reloadSpy = spyOn(component as any, 'reloadPage').and.stub();

    const file = new File(['dummy content'], 'fail.png', { type: 'image/png' });
    const mockEvent = { currentTarget: { files: [file] } } as unknown as Event;

    component.uploadFile(mockEvent, { ...mockUsuario, id_fichero: 0 });
    tick();

    expect(window.alert).toHaveBeenCalledWith('Error subiendo la imagen: Upload failed');
    expect(mockUsuarioService.update).not.toHaveBeenCalled();
    expect(reloadSpy).not.toHaveBeenCalled();
  }));

  it('debería llamar a authService.logout y navegar al login en logout()', () => {
    const authLogoutSpy = spyOn(component['authService'], 'logout').and.callThrough();
    const routerNavigateSpy = spyOn(component['router'], 'navigate');
  
    component.logout();
  
    expect(authLogoutSpy).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/login']);
  });
  
  it('debería cargar el usuario cuando los parámetros de activatedRoute cambian', () => {
    // Simulamos cambio en params
    (component['activatedRoute'].params as any) = of({ id: 123 });
  
    component.cargar();
  
    expect(component.id).toBe(123);
    expect(mockUsuarioService.getById).toHaveBeenCalledWith(123);
  });  

  it('debería cargar los datos iniciales en ngOnInit', () => {
    // Configuramos mocks para otros servicios usados en ngOnInit que no tenías (puedes mockearlos o dejarlos vacíos)
    spyOn(component['torneoService'], 'getTorneos').and.returnValue(of([{ id: 1 } as Competicion]));
    spyOn(component['torneoService'], 'getRankings').and.returnValue(of([{ id: 2 } as Competicion]));
    spyOn(component['reservaService'], 'getByFecha').and.returnValue(of([{ id: 3 } as Reserva]));
    spyOn(component['torneoService'], 'getTorneosByUsuarioId').and.returnValue(of([]));
    spyOn(component['torneoService'], 'getRankingsByUsuarioId').and.returnValue(of([]));
    spyOn(component['grupoService'], 'getAll').and.returnValue(of([]));
    spyOn(component['grupoService'], 'getByMonitorId').and.returnValue(of([]));
    spyOn(component['grupoService'], 'getByUsuarioId').and.returnValue(of([]));
    spyOn(component['torneoService'], 'getAllInscripcion').and.returnValue(of([]));
    spyOn(component['sesionesService'], 'getSesionesByUserID').and.returnValue(of([]));
    spyOn(component['sesionesService'], 'getSesionesByMonitorID').and.returnValue(of([]));
    spyOn(component['sesionesService'], 'getSesionesFuturasByUserID').and.returnValue(of([]));
    spyOn(component['sesionesService'], 'getSesionesFuturasByMonitorID').and.returnValue(of([]));
    spyOn(component['reservaService'], 'getByUser').and.returnValue(of([]));
    spyOn(component, 'getFile').and.callFake(() => {});
  
    component.ngOnInit();
  
    expect(component.torneos.length).toBe(1);
    expect(component.rankings.length).toBe(1);
    expect(component.resToday.length).toBe(1);
    expect(component.usuario).toEqual(mockUsuario);
  });
});
