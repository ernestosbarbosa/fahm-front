import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/constants/url';
import { Paciente } from 'src/app/common/paciente';
import { Video } from 'src/app/common/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient) { }

  buscarVideosPaciente(id: number) {
    return this.http.get(`${BASE_URL}/video/${id}`);
  }

  uploadVideo(p: Paciente, date: string, f: File) {
    console.log(f)
    let fd = new FormData();
    fd.append('file', f, f.name);
    return this.http.put(`${BASE_URL}/video/${p.id}/${date}/${f.name.replace(".mp4", "")}`, fd);
  }

  runProcess(fileName: string) {
    return this.http.post(`${BASE_URL}/run/${fileName}`, {});
  }

  status(fileName: string){
    return this.http.get(`${BASE_URL}/status/${fileName}`);
  }

  process(data: Video[]){
    return this.http.post(`${BASE_URL}/process`, data);
  }
}
