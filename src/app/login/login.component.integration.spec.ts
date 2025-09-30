import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { ServicioUsuarioService } from '../services/servicio-usuario.service';
import { AuthService } from '../auth/auth.service';
import { ServicioSesionesService } from '../services/servicio-sesiones.service';
import { ServicioGruposService } from '../services/servicio-grupos.service';
import { ServicioTorneosService } from '../services/servicio-torneos.service';
import { ServicioReservasService } from '../services/servicio-reservas.service';
import { ServicioFicherosService } from '../services/servicio-ficheros.service';
import { Usuario } from 'src/models/usuario';

// Importaciones de Angular Material necesarias para el template del Dashboard
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockUsuarioService: jasmine.SpyObj<ServicioUsuarioService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSesionesService: jasmine.SpyObj<ServicioSesionesService>;
  let mockGruposService: jasmine.SpyObj<ServicioGruposService>;
  let mockTorneosService: jasmine.SpyObj<ServicioTorneosService>;
  let mockReservasService: jasmine.SpyObj<ServicioReservasService>;
  let mockFicherosService: jasmine.SpyObj<ServicioFicherosService>;
  let mockActivatedRoute: any;


  beforeEach(async () => {
    // Creación de mocks para todos los servicios inyectados en el Dashboard
    mockUsuarioService = jasmine.createSpyObj('ServicioUsuarioService', ['getById', 'getByRol']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
    mockSesionesService = jasmine.createSpyObj('ServicioSesionesService', ['getSesionesByUserID', 'getSesionesByMonitorID', 'getSesionesFuturasByUserID', 'getSesionesFuturasByMonitorID']);
    mockGruposService = jasmine.createSpyObj('ServicioGruposService', ['getAll', 'getByMonitorId', 'getByUsuarioId']);
    mockTorneosService = jasmine.createSpyObj('ServicioTorneosService', ['getTorneos', 'getRankings', 'getTorneosByUsuarioId', 'getRankingsByUsuarioId', 'getAllInscripcion']);
    mockReservasService = jasmine.createSpyObj('ServicioReservasService', ['getByFecha', 'getByUser']);
    mockFicherosService = jasmine.createSpyObj('ServicioFicherosService', ['getFile', 'upload']);

    mockActivatedRoute = {
      params: of({ id: 1 }), // Simula el parámetro de ruta :id
      snapshot: { queryParams: {} }
    };


    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, UsuarioComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        // Módulos de Angular Material
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ServicioUsuarioService, useValue: mockUsuarioService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ServicioSesionesService, useValue: mockSesionesService },
        { provide: ServicioGruposService, useValue: mockGruposService },
        { provide: ServicioTorneosService, useValue: mockTorneosService },
        { provide: ServicioReservasService, useValue: mockReservasService }, { provide: ServicioFicherosService, useValue: mockFicherosService }, { provide: ServicioUsuarioService, useValue: mockUsuarioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería pasar la lista de usuarios al componente hijo app-usuario y renderizarla', () => {
    // Arrange: Preparar datos y mocks
   const mockUsuarios: Usuario[] = [
    {
     id: 10,
     nombre: 'Juan',
     apellido1: 'Perez',
     rol: 'Usuario',
     email: 'juan@test.com',
     password: '',
     id_fichero: 0,
     apellido2: '',
     terminos: 0,
     privacidad: 0,
     comercial: 0
    }
   ];
   const mockCoordinador = {
    id: 1,
    nombre: 'Admin',
    apellido1: 'Coord',
    rol: 'Coordinador',
    email: 'admin@test.com',
    password: '',
    id_fichero: 63,
    apellido2: '',
    terminos: 0,
    privacidad: 0,
    comercial: 0
   };

    // Configurar los mocks para que devuelvan datos simulados
    mockUsuarioService.getById.and.returnValue(of(mockCoordinador));
    mockUsuarioService.getByRol.withArgs('Usuario').and.returnValue(of(mockUsuarios));
    // Configurar el resto de llamadas en ngOnInit para que no fallen
    mockTorneosService.getTorneos.and.returnValue(of([]));

    mockTorneosService.getRankings.and.returnValue(of([]));
    mockReservasService.getByFecha.and.returnValue(of([]));
    mockUsuarioService.getByRol.withArgs('Monitor').and.returnValue(of([]));

    mockTorneosService.getTorneosByUsuarioId.and.returnValue(of([]));
    mockTorneosService.getRankingsByUsuarioId.and.returnValue(of([]));
    mockGruposService.getAll.and.returnValue(of([]));
    mockGruposService.getByMonitorId.and.returnValue(of([]));
    mockGruposService.getByUsuarioId.and.returnValue(of([]));
    mockTorneosService.getAllInscripcion.and.returnValue(of([]));
    mockSesionesService.getSesionesByUserID.and.returnValue(of([]));
    mockSesionesService.getSesionesByMonitorID.and.returnValue(of([]));
    mockSesionesService.getSesionesFuturasByUserID.and.returnValue(of([]));
    mockSesionesService.getSesionesFuturasByMonitorID.and.returnValue(of([]));
    mockReservasService.getByUser.and.returnValue(of([]));

   // Act: Disparar el ciclo de vida y la detección de cambios
    fixture.detectChanges();

    // Assert: Verificar el resultado en el DOM
    const compiled = fixture.nativeElement as HTMLElement;
    const usuarioComponentElement = compiled.querySelector('app-usuario');
    expect(usuarioComponentElement).toBeTruthy('El componente app-usuario debería existir en el DOM');

    const nombreUsuarioRenderizado = usuarioComponentElement?.querySelector('td')?.textContent;
    expect(nombreUsuarioRenderizado).toContain('Juan', 'El nombre del usuario debería renderizarse en la tabla del componente hijo');
  });
});
