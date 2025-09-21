import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RedeApoioService, RedeApoio } from '../../services/redeApoio/redeApoio.service';

@Component({
  selector: 'app-redeApoio',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './redeApoio.component.html'
})
export class RedeApoioComponent implements OnInit {
  redeApoio: RedeApoio[] = [];
  carregando = true;

  constructor(private readonly redeApoioService: RedeApoioService) {}

  ngOnInit(): void {
    this.redeApoioService.listarRedeApoio().subscribe({
      next: (dados) => {
        this.redeApoio = dados.map(d => ({
          id: d.id ?? (d as any).Id,
          nome: d.nome ?? (d as any).Nome,
          tipo: d.tipo ?? (d as any).Tipo,
          contato: d.contato ?? (d as any).Contato
        }));
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar Rede de Apoio:', err);
        this.carregando = false;
      }
    });
  }
}
