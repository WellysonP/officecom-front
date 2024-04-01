import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  authenticationError = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService

  ) { }

  register(loginForm: any): void {
    if (loginForm.valid) {
      this.authService.register({
        email: loginForm.value.email,
        nome: loginForm.value.nome,
        senha: loginForm.value.password,
        endereco: loginForm.value.endereco,
        telefone: loginForm.value.telefone
      }).subscribe({
        complete: ()=>{
          this.authenticationError = false;
          this.router.navigate(["login"])
        },
        error: (e)=>{
          console.log(e)
        }
      })

    } else {
      console.log("Formulário inválido. Por favor, verifique seus dados.");
    }
  }

}
