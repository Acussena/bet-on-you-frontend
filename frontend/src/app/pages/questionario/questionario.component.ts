import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionarioService } from '../../services/questionario/questionario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questionario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './questionario.component.html'
})
export class QuestionarioComponent {
  questionarioForm: FormGroup;
  classificacaoRisco: string | null = null;
  mensagemDica: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly questionarioService: QuestionarioService
  ) {
    this.questionarioForm = this.formBuilder.group({
      frequenciaApostas: new FormControl('', [Validators.required]),
      valorMensal: new FormControl('', [Validators.required, Validators.min(0.01)]),
      motivo: new FormControl('', [Validators.maxLength(255)])
    });
  }

  onCadastrar() {
    const { frequenciaApostas, valorMensal, motivo } = this.questionarioForm.value;

    this.questionarioService.cadastrarQuestionario(frequenciaApostas, valorMensal, motivo).subscribe({
      next: () => {
        const classificacao = this.getClassificacaoRisco(frequenciaApostas, valorMensal);
        this.classificacaoRisco = classificacao;
        this.mensagemDica = this.getMensagemDica(classificacao);
        this.questionarioForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao cadastrar questionário:', err);
      }
    });
  }

  private getClassificacaoRisco(frequencia: number, valorMensal: number): string {
    if (frequencia < 1 || frequencia > 5) {
      return 'Indefinido';
    }

    if (frequencia <= 2) {
      if (valorMensal <= 100) return 'Baixo Risco';
      if (valorMensal <= 500) return 'Médio Risco';
      if (valorMensal <= 1000) return 'Alto Risco';
      return 'Crítico';
    }

    if (frequencia === 3) {
      if (valorMensal <= 200) return 'Médio Risco';
      if (valorMensal <= 1000) return 'Alto Risco';
      if (valorMensal <= 2000) return 'Muito Alto';
      return 'Crítico';
    }

    if (frequencia >= 4) {
      if (valorMensal <= 500) return 'Alto Risco';
      if (valorMensal <= 1500) return 'Muito Alto';
      return 'Crítico';
    }

    return 'Indefinido';
  }

  private getMensagemDica(classificacao: string): string {
    switch (classificacao) {
      case 'Baixo Risco':
        return 'Parabéns! Seu nível de risco é baixo. Continue controlando seus gastos.';
      case 'Médio Risco':
        return 'Atenção! Seu nível de risco é médio. Reflita sobre os impactos financeiros.';
      case 'Alto Risco':
        return 'Cuidado! Você está em alto risco. Considere procurar ajuda.';
      case 'Muito Alto':
        return 'Seus gastos estão muito altos, mesmo para sua frequência. Procure apoio!';
      case 'Crítico':
        return 'Nível crítico! Procure imediatamente apoio psicológico e financeiro.';
      default:
        return 'Não foi possível calcular o risco.';
    }
  }
}
