import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteCriacaoComponent } from './paciente/criacao/paciente-criacao.component';
import { PacienteEdicaoComponent } from './paciente/edicao/paciente-edicao.component';
import { PacienteConsultaComponent } from './paciente/consulta/paciente-consulta.component';
import { VideoCriacaoComponent } from './video/criacao/video-criacao.component';
import { VideoConsultaComponent } from './video/consulta/video-consulta.component';

const routes: Routes = [
  { path: 'paciente/criar', component: PacienteCriacaoComponent },
  { path: 'paciente/editar/:id', component: PacienteEdicaoComponent },
  { path: 'paciente/consultar', component: PacienteConsultaComponent },
  { path: 'video/upload', component: VideoCriacaoComponent },
  { path: 'video/consultar', component: VideoConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
