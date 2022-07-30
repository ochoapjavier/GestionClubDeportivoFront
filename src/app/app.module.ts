import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TorneoComponent } from './torneo/torneo.component';
import { FormTorneoComponent } from './torneo/form-torneo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { PistaPadelComponent } from './pista-padel/pista-padel.component';
import { FormPistaPadelComponent } from './pista-padel/form-pista-padel.component';
import { ReservaComponent } from './reserva/reserva.component';
import { FormReservaComponent } from './reserva/form-reserva.component';
import { GrupoComponent } from './grupo/grupo.component';
import { FormGrupoComponent } from './grupo/form-grupo.component';
import { GrupoDetalleComponent } from './grupo/grupo-detalle.component';

const routes:Routes=[
  {path:'', component:IndexComponent},
  {path:'torneos', component:TorneoComponent},
  {path:'torneos-form', component:FormTorneoComponent},
  {path:'torneos-form/:id', component:FormTorneoComponent},
  {path:'usuarios', component:UsuarioComponent},
  {path:'usuarios-form', component:FormUsuarioComponent},
  {path:'usuarios-form/:id', component:FormUsuarioComponent},
  {path:'quienes-somos', component:QuienesSomosComponent},
  {path:'login', component:LoginComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'dashboard/:id', component:DashboardComponent},
  {path:'pistas-tenis', component:PistaTenisComponent},
  {path:'pistas-tenis-form', component:FormPistaTenisComponent},
  {path:'pistas-tenis-form/:id', component:FormPistaTenisComponent},
  {path:'pistas-padel', component:PistaPadelComponent},
  {path:'pistas-padel-form', component:FormPistaPadelComponent},
  {path:'pistas-padel-form/:id', component:FormPistaPadelComponent},
  {path:'reservas', component:ReservaComponent},
  {path:'reservas-form', component:FormReservaComponent},
  {path:'reservas-form/:id', component:FormReservaComponent}, 
  {path:'grupos', component:GrupoComponent},
  {path:'grupos-form', component:FormGrupoComponent},
  {path:'grupos-form/:id', component:FormGrupoComponent}, 
  {path:'grupo-detalle', component:GrupoDetalleComponent},
  {path:'grupo-detalle/:id', component:GrupoDetalleComponent}, 
]

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
      GrupoDetalleComponent
    
      
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
