import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Paciente } from 'src/app/common/paciente';
import { PacienteService } from 'src/app/paciente/service/paciente.service';
import { MyErrorStateMatcher } from 'src/app/common/error-matcher';
import { VideoService } from '../service/video.service';
import { Router } from '@angular/router';
import { Video } from 'src/app/common/video';

@Component({
  selector: 'app-video-criacao',
  templateUrl: './video-criacao.component.html',
  styleUrls: ['./video-criacao.component.css']
})
export class VideoCriacaoComponent implements OnInit {

  loading: boolean;

  paciente = new FormControl('', [
    Validators.required
  ]);

  pacientes: Paciente[] = [];

  filteredPacientes: Observable<Paciente[]>;

  date = new FormControl(new Date());

  fileToUpload: File = null;

  constructor(private ps: PacienteService, private vs: VideoService, private rs: Router) {
    this.ps.listarPacientes().subscribe(data => {
      this.pacientes = data as Paciente[];
    })
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.filteredPacientes = this.paciente.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: Paciente): Paciente[] {
    const filterValue = value && value.name ? value.name.toLowerCase() : "";
    return this.pacientes.filter(p => p.name.toLowerCase().includes(filterValue));
  }

  displayFn(paciente?: Paciente): string | undefined {
    return paciente ? paciente.name : undefined;
  }

  validateSelection(value) {
    let filtered = this.pacientes.filter(p => p.name.toLowerCase().includes(value))
    if (!filtered || filtered.length > 0 && filtered[0].name != value) {
      this.paciente.setValue(undefined);
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload() {
    if (!this.paciente.value || !this.fileToUpload) {
      alert('erro')
      return;
    }

    this.loading = true;
    let date: Date = this.date.value;
    this.vs.uploadVideo(this.paciente.value, `${date.getFullYear()}-${(date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}`, this.fileToUpload).subscribe(data => {
      let video: Video = data as Video;
      this.vs.runProcess(video.fileName).subscribe(data => {
        alert('sucesso');
        // this.rs.navigate(['/video/consultar']);
        this.loading = false;
      })
    })
  }
}
