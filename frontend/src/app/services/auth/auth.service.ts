import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5124/api';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }

  cadastrar(nome: string, email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, { nome, email, senha },{
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
