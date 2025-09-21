import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Questionario {
  frequenciaApostas: number;
  valorMensal: number;
  motivo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {

  private readonly apiUrl = 'http://localhost:5124/api/questionario';

  constructor(private readonly http: HttpClient) {}

  cadastrarQuestionario(frequenciaApostas: number, valorMensal: number, motivo?: string): Observable<{Message: string, Id: number}> {
    const payload: Questionario = { frequenciaApostas, valorMensal, motivo };
    return this.http.post<{Message: string, Id: number}>(this.apiUrl, payload);
  }

  obterQuestionarioPorId(id: number): Observable<Questionario> {
    return this.http.get<Questionario>(`${this.apiUrl}/${id}`);
  }
}
