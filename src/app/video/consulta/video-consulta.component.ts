import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Paciente } from 'src/app/common/paciente';
import { Observable, forkJoin, generate } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PacienteService } from 'src/app/paciente/service/paciente.service';
import { VideoService } from '../service/video.service';
import { MyErrorStateMatcher } from 'src/app/common/error-matcher';
import { Video } from 'src/app/common/video';
import { Clip } from 'src/app/common/clip';
import { Quadro } from 'src/app/common/quadro';
import { Pessoa } from 'src/app/common/pessoa';
import { ChartComponent } from 'angular2-chartjs';
import * as dtw from 'dynamic-time-warping'
import * as euclidean from 'compute-euclidean-distance'
import { keypointsBody25 } from 'src/app/constants/keypoints';

@Component({
  selector: 'app-video-consulta',
  templateUrl: './video-consulta.component.html',
  styleUrls: ['./video-consulta.component.css']
})
export class VideoConsultaComponent implements OnInit {

  loading: boolean;

  showData: boolean;

  showDtw: boolean;

  paciente = new FormControl('', [
    Validators.required
  ]);

  pacientes: Paciente[] = [];

  videos: Video[] = [];

  videoA;
  videoB;

  keypoints = [];
  keypoint;

  filteredPacientes: Observable<Paciente[]>;

  fileToUpload: File = null;

  dataSource: Video[] = [];
  displayedColumns: string[] = ['idx', 'id', 'fileName', 'date', 'path', 'exist'];

  clips: Clip[] = [];

  @ViewChild('chartData') chartComponent: ChartComponent;
  @ViewChild('chartDtw') chartComponentDtw: ChartComponent;
  @ViewChild('chartDtwCropped') chartComponentDtwCropped: ChartComponent;

  type = 'line';
  data;

  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  display = "none";


  constructor(private ps: PacienteService, private vs: VideoService) {
    this.ps.listarPacientes().subscribe(data => {
      this.pacientes = data as Paciente[];
    })
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    var options = Object.keys(keypointsBody25);
    this.keypoints = options.slice(options.length / 2);

    this.filteredPacientes = this.paciente.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: any): Paciente[] {
    let filterValue;
    if(typeof value === "string"){
      filterValue = value.toLowerCase();
    } else {
      filterValue = value && value.name ? value.name.toLowerCase() : "";
    }
    return this.pacientes.filter(p => p.name.toLowerCase().includes(filterValue));
  }

  displayFn(paciente?: Paciente): string | undefined {
    return paciente ? paciente.name : undefined;
  }

  // validateSelection(value) {
  //   let filtered = this.pacientes.filter(p => p.name.toLowerCase().includes(value))
  //   if (!filtered || filtered.length > 0 && filtered[0].name != value) {
  //     this.paciente.setValue(undefined);
  //   }
  // }

  returnDate(date){
    return new Date(date).toLocaleDateString();
  }
  pesquisar() {
    this.loading = true;
    this.showData = false;
    this.display = "none";

    this.vs.buscarVideosPaciente(this.paciente.value.id).subscribe(data => {
      let d: any = data;
      let content = d.content as Video[];
      let videos: Video[] = [];
      this.updateVideosReponse(content).subscribe(resultArray => {
        resultArray.forEach((v: Video) => {
          let f = content.filter(c => c.fileName == v.fileName);
          if (f.length > 0) {
            f[0].exist = v.exist;
            videos.push(f[0]);
          }
        })
        this.dataSource = videos;
        this.videos = videos;

        this.vs.process(this.dataSource).subscribe(data => {

          let clipsData: Clip[] = data as Clip[];

          this.clips = [];
          clipsData.forEach(c => {
            let quadros: Quadro[] = [];
            c.quadros.forEach(q => {
              let pessoas: Pessoa[] = [];
              q.pessoas.forEach(p => {
                if (p.idPessoa == 0) {
                  pessoas.push(p);
                }
              })
              quadros.push({ idQuadro: q.idQuadro, pessoas: pessoas });
            })
            this.clips.push({ quadros: quadros });
          })

          this.data = this.generateDataset(this.clips)
          console.log(this.data)

          this.showData = true;
          this.display = "block";

          this.chartComponent.chart.update();
          this.chartComponent.chart.canvas.parentNode.style.height = '300px';

          this.loading = false;
        })

      })
    })
  }

  updateVideosReponse(content: Video[]) {
    let observables = [];
    content.forEach(v => {
      observables.push(this.vs.status(v.fileName));
    })
    return forkJoin(observables);
  }

  generateDataset(clips: Clip[]) {
    let datasets = [];
    let size = 0;

    clips.forEach((c, index) => {
      let pontos = [];
      c.quadros.forEach(q => {
        q.pessoas.forEach(p => {
          p.pontos.forEach(pt => {
            if (pt.ponto == this.keypoint) {
              pontos.push(pt.y);
            }
          })
        })
      })
      size = c.quadros.length > size ? c.quadros.length : size;
      datasets.push({ label: `Análise ${index}`, data: pontos, borderColor: this.getRandomColor() });
    })

    let labels = Array.apply(null, { length: size }).map(Number.call, Number)

    return {
      datasets: datasets,
      labels: labels

      //exemplo didatico
      // datasets: [
      //   { label: `Curva A`, data: [0,1,2,3,4,5,6,7], borderColor: this.getRandomColor() },
      //   // { label: `Curva B`, data: [0,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,6,7], borderColor: this.getRandomColor() }
      //   { label: `Curva B`, data: [2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,8,9], borderColor: this.getRandomColor() }
      // ],
      // labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    };
  }

  generateColorArray(size) {
    let colors = [];
    for (var i = 0; i < size; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  analisar(){
    if(this.videoA == undefined || this.videoB == undefined){
      alert("Devem ser selecionados dois videos")
      return;
    }
    this.getEuclideanDistance(this.videoA, this.videoB);
    this.getDynamicTimeWarpingDistance(this.videoA, this.videoB);
  }


  euclideanDistance;
  stringEuclideanDistance;

  dynamicTimeWarping;
  dynamicTimeWarpingDistance;
  dynamicTimeWarpingPath;
  dynamicTimeWarpingCropped;
  dynamicTimeWarpingCroppedDistance;
  dynamicTimeWarpingCroppedPath;
  displayDtw = "none";
  displayDtwCropped = "none";
  dataDtw;
  dataDtwCropped;

  getEuclideanDistance(a: number, b: number) {
    let ser1 = this.data.datasets[a].data;
    let ser2 = this.data.datasets[b].data;

    // let ser1 = [0,1,2,3,4,5,6,7];
    // // let ser2 = [0,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,6,7];
    // let ser2 = [2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,8,9];

    let differenceLength = Math.abs(ser1.length - ser2.length);
    console.log(ser1.length)
    console.log(ser2.length)
    console.log(differenceLength)
    if(ser1.length > ser2.length){
      ser1 = ser1.slice(0, ser1.length - differenceLength)
    } else if(ser1.length < ser2.length){
      ser2 = ser2.slice(0, ser2.length - differenceLength)
    }

    console.log(ser1)
    console.log(ser2)
    this.euclideanDistance = euclidean(ser1, ser2);
    this.stringEuclideanDistance = `${this.euclideanDistance}`.replace(".", ",");
    console.log(this.euclideanDistance)
  }


  /* Dynamic Time Warping */

  distFunc(a, b) {
    return Math.abs(a - b);
  };

  getDynamicTimeWarpingDistance(a: number, b: number) {
    let ser1 = this.data.datasets[a].data;
    let ser2 = this.data.datasets[b].data;

    let ser1Cropped = ser1;
    let ser2Cropped = ser2;

    let differenceLength = Math.abs(ser1.length - ser2.length);
    if(ser1.length > ser2.length){
      ser1Cropped = ser1.slice(0, ser1.length - differenceLength)
    } else if(ser1.length < ser2.length){
      ser2Cropped = ser2.slice(0, ser2.length - differenceLength)
    }


    // exemplo didatico
    // let ser1 = [0,1,2,3,4,5,6,7];
    // // let ser2 = [0,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,6,7];
    // let ser2 = [2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,8,9];

    this.dynamicTimeWarping = new dtw(ser1, ser2, this.distFunc);
    this.dynamicTimeWarpingDistance = this.dynamicTimeWarping.getDistance();
    this.dynamicTimeWarpingPath = this.dynamicTimeWarping.getPath();

    let size = this.dynamicTimeWarpingPath.length;
    let labels = Array.apply(null, { length: size }).map(Number.call, Number)

    // let dtwPathData = this.getDtwPathData(this.dynamicTimeWarpingPath)

    this.dataDtw = {
      datasets: [
        { label: `Analise ${a}`, data: ser1, borderColor: this.getRandomColor() },
        { label: `Analise ${b}`, data: ser2, borderColor: this.getRandomColor() }
      ],
      labels: labels
    }

    this.dynamicTimeWarpingCropped = new dtw(ser1Cropped, ser2Cropped, this.distFunc);
    this.dynamicTimeWarpingCroppedDistance = this.dynamicTimeWarpingCropped.getDistance();
    this.dynamicTimeWarpingCroppedPath = this.dynamicTimeWarpingCropped.getPath();

    let sizeCropped = this.dynamicTimeWarpingCroppedPath.length;
    let labelsCropped = Array.apply(null, { length: sizeCropped }).map(Number.call, Number)

    // let dtwCroppedPathData = this.getDtwPathData(this.dynamicTimeWarpingCroppedPath)

    this.dataDtwCropped = {
      datasets: [
        { label: `Analise ${a}`, data: ser1Cropped, borderColor: this.getRandomColor() },
        { label: `Analise ${b}`, data: ser2Cropped, borderColor: this.getRandomColor() }
      ],
      labels: labelsCropped
    }

    this.chartComponentDtw.chart.update();
    this.chartComponentDtw.chart.canvas.parentNode.style.height = '300px';

    this.chartComponentDtwCropped.chart.update();
    this.chartComponentDtwCropped.chart.canvas.parentNode.style.height = '300px';

    this.displayDtw = "block";
    this.displayDtwCropped = "block";
  }

  getDtwPathData(dtwPath: any[]){
    let r = []
    dtwPath.forEach(e=>{
      r.push(e[1])
    })
    return r;
  }






}
