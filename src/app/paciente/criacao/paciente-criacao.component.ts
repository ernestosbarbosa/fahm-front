import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PacienteService } from '../service/paciente.service';
import { MyErrorStateMatcher } from 'src/app/common/error-matcher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-criacao',
  templateUrl: './paciente-criacao.component.html',
  styleUrls: ['./paciente-criacao.component.css']
})
export class PacienteCriacaoComponent implements OnInit {

  loading: boolean;

  nomePacienteFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private ps: PacienteService, private rs: Router) { }

  ngOnInit() {
  }

  salvar() {
    if (!this.nomePacienteFormControl.value || this.nomePacienteFormControl.value.trim() == '') {
      alert('erro');
      return;
    }
    this.loading = true;
    this.ps.criarPaciente(this.nomePacienteFormControl.value).subscribe(data => {
      alert('sucesso');
      this.rs.navigate(['/video/upload']);
    }, err => {
      alert('erro request');
      this.loading = false;
    })
  }

}
