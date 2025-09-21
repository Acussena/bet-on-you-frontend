import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-conscientizacao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './conscientizacao.component.html'
})
export class ConscientizacaoComponent {
  conscientizacaoForm: FormGroup;
  resultadoMensal: number | null = null;
  resultadoAnual: number | null = null;
  investimentoAnual: number | null = null;

  constructor(private readonly formBuilder: FormBuilder) {
    this.conscientizacaoForm = this.formBuilder.group({
      valorApostado: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  calcularImpacto() {
    const valorApostado = this.conscientizacaoForm.value.valorApostado;

    if (!valorApostado || valorApostado <= 0) return;

    this.resultadoMensal = valorApostado;

    this.resultadoAnual = valorApostado * 12;

    // Simulação de investimento (0.5% ao mês ≈ 6% ao ano)
    const taxaJuros = 0.005; // 0.5% ao mês
    let acumulado = 0;

    for (let i = 0; i < 12; i++) {
      acumulado = (acumulado + valorApostado) * (1 + taxaJuros);
    }

    this.investimentoAnual = parseFloat(acumulado.toFixed(2));
  }
}
