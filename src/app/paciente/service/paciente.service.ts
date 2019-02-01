import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/constants/url';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  listarPacientes() {
    return this.http.get(`${BASE_URL}/paciente/listar`);
  }
  buscarPaciente(id: number) {
    return this.http.get(`${BASE_URL}/paciente/${id}`);
  }
  criarPaciente(nome: string) {
    return this.http.put(`${BASE_URL}/paciente/criar`, {
      name: nome
    });
  }
  atualizarPaciente(id: number, nome: string) {
    return this.http.post(`${BASE_URL}/paciente/atualizar/${id}`, {
      name: nome
    });
  }
  excluirPaciente(id: number) {
    return this.http.delete(`${BASE_URL}/paciente/excluir/${id}`);
  }
}
