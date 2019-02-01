import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatTableModule, MatIconModule, MatProgressSpinnerModule, MatAutocompleteModule, MatSelectModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteConsultaComponent } from './paciente/consulta/paciente-consulta.component';
import { PacienteEdicaoComponent } from './paciente/edicao/paciente-edicao.component';
import { PacienteCriacaoComponent } from './paciente/criacao/paciente-criacao.component';
import { VideoConsultaComponent } from './video/consulta/video-consulta.component';
import { VideoCriacaoComponent } from './video/criacao/video-criacao.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PacienteService } from './paciente/service/paciente.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    AppComponent,
    PacienteConsultaComponent,
    PacienteEdicaoComponent,
    PacienteCriacaoComponent,
    VideoConsultaComponent,
    VideoCriacaoComponent,
    MenuComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartModule
  ],
  providers: [
    PacienteService,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
