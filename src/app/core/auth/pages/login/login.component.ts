import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authenticationError = false;
  isRegister = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar

  ) { }

  loginOrRegister(loginForm: any) {
    console.log("Chegou aqui")
    this.isRegister ? this.register(loginForm) : this.login(loginForm)
  }

  login(loginForm: any): void {
    if (loginForm.valid) {
      this.authService.login({
        email: loginForm.value.email,
        senha: loginForm.value.password
      }).subscribe({
        complete: () => {
          this.authenticationError = false;
          this.router.navigate(['home'])
        },
        error: (e) => {
          this.error(e.error)
        }
      })

    } else {
      this.openSnackBar("Formulário inválido. Por favor, verifique seus dados.")
    }
  }

  register(loginForm: any): void {
    if (loginForm.valid) {
      this.authService.register({
        email: loginForm.value.email,
        nome: loginForm.value.nome,
        senha: loginForm.value.password,
        endereco: loginForm.value.endereco,
        telefone: loginForm.value.telefone
      }).subscribe({
        complete: () => {
          this.authenticationError = false;
          this.router.navigate(["login"])
          this.isRegister = false
        },
        error: (e) => {
          this.error(e.error)
        }
      })

    } else {
      this.openSnackBar("Formulário inválido. Por favor, verifique seus dados.")
    }
  }

  error(error: any) {
    let content: string = ""
    for (let key in error) {
      if (error.hasOwnProperty(key)) {
        content += `${key}: ${error[key]}\n`;
      }
    }
    this.openSnackBar(content)
  }

  changeRoute() {
    this.isRegister = !this.isRegister
  }

  openSnackBar(content: string) {
    this._snackBar.open(content, 'X', {
      horizontalPosition: "right",
      verticalPosition: "top",
    });

    setTimeout(() => {
      this._snackBar.dismiss();
    }, 5000);
  }
}
