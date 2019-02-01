import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private rs: Router) { }

  ngOnInit() {
  }

  goPacienteCriar() {
    this.rs.navigate(['/paciente/criar'])
  }

  goPacienteConsultar() {
    this.rs.navigate(['/paciente/consultar'])
  }

  goVideoUpload() {
    this.rs.navigate(['/video/upload'])
  }

  goVideoConsultar() {
    this.rs.navigate(['/video/consultar'])
  }


}
