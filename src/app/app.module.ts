import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TorneoComponent } from './torneo/torneo.component';
import { FormTorneoComponent } from './torneo/form-torneo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormUsuarioComponent } from './usuario/form-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PistaTenisComponent } from './pista/pista-tenis.component';
import { FormPistaTenisComponent } from './pista/form-pista-tenis.component';
import { SuperficieComponent } from './superficie/superficie.component';

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
  {path:'pistas-tenis-form/:id', component:FormPistaTenisComponent}
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
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
