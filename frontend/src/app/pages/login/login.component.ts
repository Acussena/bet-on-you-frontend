import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router 
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastService.error('Por favor, preencha o formulário corretamente.');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.toastService.success('Login feito com sucesso');
        this.router.navigate(['/menu']); 
      },
      error: () => this.toastService.error('Login ou senha incorretos, tente novamente!'),
    });
  }
}
