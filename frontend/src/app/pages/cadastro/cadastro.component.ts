import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastrService,
    private readonly authService: AuthService,
    private router: Router 
  ){
    this.cadastroForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onCadastrar() {
    this.authService.cadastrar(this.cadastroForm.value.nome, this.cadastroForm.value.email, this.cadastroForm.value.senha).subscribe({
      next: (res) => {
        this.toastService.success(res.message || 'Cadastro realizado com sucesso!');
        this.router.navigate(['/menu']); 
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        const msg = err.error?.message || 'Erro inesperado no cadastro.';
        this.toastService.error(msg);
      }
    });
  }
}
