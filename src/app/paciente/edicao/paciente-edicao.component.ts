import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PacienteService } from '../service/paciente.service';
import { MyErrorStateMatcher } from 'src/app/common/error-matcher';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-edicao',
  templateUrl: './paciente-edicao.component.html',
  styleUrls: ['./paciente-edicao.component.css']
})
export class PacienteEdicaoComponent implements OnInit {

  loading: boolean;

  id: number;

  nomePacienteFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private ps: PacienteService, private route: ActivatedRoute, private rs: Router) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.ps.buscarPaciente(this.id).subscribe(data => {
      let res:any = data;
      this.nomePacienteFormControl.setValue(res.name)
    })
  }

  salvar() {
    if (!this.nomePacienteFormControl.value || this.nomePacienteFormControl.value.trim() == '') {
      alert('erro');
      return;
    }
    this.loading = true;
    this.ps.atualizarPaciente(this.id, this.nomePacienteFormControl.value).subscribe(data => {
      alert('sucesso');
      this.rs.navigate(['/paciente/consultar']);
    }, err => {
      alert('erro request');
      this.loading = false;
    })
  }

}
