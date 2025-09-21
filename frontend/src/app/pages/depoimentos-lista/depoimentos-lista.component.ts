import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepoimentosListaService, Depoimento } from '../../services/depoimentos-lista/depoimentos-lista.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-depoimentos-lista',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './depoimentos-lista.component.html'
})
export class DepoimentosListaComponent implements OnInit {
  depoimentoForm: FormGroup;
  depoimentos: Depoimento[] = [];
  mensagemSucesso: string | null = null;
  editandoId: number | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly depoimentosService: DepoimentosListaService
  ) {
    this.depoimentoForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.maxLength(100)]),
      titulo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      texto: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });
  }

  ngOnInit(): void {
    this.carregarDepoimentos();
  }

  carregarDepoimentos(): void {
    this.depoimentosService.listar().subscribe({
      next: (data) => (this.depoimentos = data),
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar depoimentos:', err);
      }
    });
  }

  onCadastrar(): void {
    const { nome, titulo, texto } = this.depoimentoForm.value;

    if (this.editandoId) {
      // Editando
      this.depoimentosService.atualizar(this.editandoId, { nome, titulo, texto }).subscribe({
        next: () => {
          this.mensagemSucesso = 'Depoimento atualizado com sucesso!';
          this.depoimentoForm.reset();
          this.editandoId = null;
          this.carregarDepoimentos();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao atualizar depoimento:', err);
        }
      });
    } else {
      // Criando novo
      this.depoimentosService.criar({ nome, titulo, texto }).subscribe({
        next: () => {
          this.mensagemSucesso = 'Depoimento enviado com sucesso!';
          this.depoimentoForm.reset();
          this.carregarDepoimentos();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao cadastrar depoimento:', err);
        }
      });
    }
  }

  onEditar(depo: Depoimento): void {
    this.editandoId = depo.id || null;
    this.depoimentoForm.setValue({
      nome: depo.nome || '',
      titulo: depo.titulo,
      texto: depo.texto
    });
  }

  onExcluir(id: number): void {
    if (!confirm('Deseja realmente excluir este depoimento?')) return;

    this.depoimentosService.excluir(id).subscribe({
      next: () => {
        this.mensagemSucesso = 'Depoimento excluído com sucesso!';
        this.carregarDepoimentos();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao excluir depoimento:', err);
      }
    });
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.depoimentoForm.reset();
  }
}
