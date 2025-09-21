import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RedeApoio {
  id: number;
  nome: string;
  tipo: string;
  contato?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RedeApoioService {
  private readonly apiUrl = 'http://localhost:5124/api/redeApoio';

  constructor(private readonly http: HttpClient) {}

  listarRedeApoio(): Observable<RedeApoio[]> {
    return this.http.get<RedeApoio[]>(this.apiUrl);
  }
}
