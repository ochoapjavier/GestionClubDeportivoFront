import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TorneoComponent } from './torneo/torneo.component';
import { FormTorneoComponent } from './torneo/form-torneo.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PistaTenisComponent } from './pista-tenis/pista-tenis.component';
import { FormPistaTenisComponent } from './pista-tenis/form-pista-tenis.component';
import { SuperficieComponent } from './superficie/superficie.component';
import { PistaPadelComponent } from './pista-padel/pista-padel.component';
import { FormPistaPadelComponent } from './pista-padel/form-pista-padel.component';
import { ReservaComponent } from './reserva/reserva.component';
import { FormReservaComponent } from './reserva/form-reserva.component';
import { GrupoComponent } from './grupo/grupo.component';
import { FormGrupoComponent } from './grupo/form-grupo.component';
import { GrupoDetalleComponent } from './grupo/grupo-detalle.component';
import { SubidaFicheroComponent } from './subida-fichero/subida-fichero.component';
import { SesionComponent } from './sesion/sesion.component';
import { FormSesionComponent } from './sesion/form-sesion.component';
import { PrivacidadComponent } from './privacidad/privacidad/privacidad.component';
import { TerminosComponent } from './terminos/terminos/terminos.component';

// Guards and Interceptors
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';

// Routes
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'torneos', component: TorneoComponent },
  { path: 'torneos-form', component: FormTorneoComponent },
  { path: 'torneos-form/:id', component: FormTorneoComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'usuarios-form', component: FormUsuarioComponent },
  { path: 'usuarios-form/:id', component: FormUsuarioComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'pistas-tenis', component: PistaTenisComponent, canActivate: [AuthGuard] },
  { path: 'pistas-tenis-form', component: FormPistaTenisComponent, canActivate: [AuthGuard] },
  { path: 'pistas-tenis-form/:id', component: FormPistaTenisComponent, canActivate: [AuthGuard] },
  { path: 'pistas-padel', component: PistaPadelComponent, canActivate: [AuthGuard] },
  { path: 'pistas-padel-form', component: FormPistaPadelComponent, canActivate: [AuthGuard] },
  { path: 'pistas-padel-form/:id', component: FormPistaPadelComponent, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservaComponent },
  { path: 'reservas-form', component: FormReservaComponent },
  { path: 'reservas-form/:id', component: FormReservaComponent },
  { path: 'grupos', component: GrupoComponent },
  { path: 'grupos-form', component: FormGrupoComponent },
  { path: 'grupos-form/:id', component: FormGrupoComponent },
  { path: 'grupo-detalle', component: GrupoDetalleComponent },
  { path: 'grupo-detalle/:id', component: GrupoDetalleComponent },
  { path: 'subida', component: SubidaFicheroComponent },
  { path: 'sesion-form', component: FormSesionComponent },
  { path: 'sesion-form/:id', component: FormSesionComponent },
  { path: 'privacidad', component: PrivacidadComponent },
  { path: 'terminos', component: TerminosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TorneoComponent,
    FormTorneoComponent,
    QuienesSomosComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    ContactoComponent,
    UsuarioComponent,
    FormUsuarioComponent,
    DashboardComponent,
    PistaTenisComponent,
    FormPistaTenisComponent,
    SuperficieComponent,
    PistaPadelComponent,
    FormPistaPadelComponent,
    ReservaComponent,
    FormReservaComponent,
    GrupoComponent,
    FormGrupoComponent,
    GrupoDetalleComponent,
    SubidaFicheroComponent,
    SesionComponent,
    FormSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' } // Configuración para comenzar la semana en lunes
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
