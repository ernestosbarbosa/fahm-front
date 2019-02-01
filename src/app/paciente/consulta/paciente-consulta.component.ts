import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { Paciente } from 'src/app/common/paciente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-consulta',
  templateUrl: './paciente-consulta.component.html',
  styleUrls: ['./paciente-consulta.component.css']
})
export class PacienteConsultaComponent implements OnInit {
  loading: boolean;
  dataSource: Paciente[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private ps: PacienteService, private rs: Router) { }

  ngOnInit() {
    this.ps.listarPacientes().subscribe(data => {
      this.dataSource = data as Paciente[];
    })
  }
  editar(id: number) {
    this.loading = true;
    this.rs.navigate(['/paciente/editar', id]);
  }

}
