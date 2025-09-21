import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Depoimento {
  id?: number;
  nome?: string;
  titulo: string;
  texto: string;
  dataCriacao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepoimentosListaService {
  private apiUrl = 'http://localhost:5124/api/depoimentos';

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Depoimento[]> {
    return this.http.get<Depoimento[]>(this.apiUrl);
  }

  criar(payload: Partial<Depoimento>) {
    return this.http.post<{ Message: string; Id: number }>(this.apiUrl, payload);
  }

  atualizar(id: number, payload: Partial<Depoimento>) {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  excluir(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
