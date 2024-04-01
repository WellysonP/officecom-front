import { UserSessionService } from './../../../auth/services/user-session.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/auth/models/usuario-model';
import { AuthenticationService } from 'src/app/core/auth/services/authentication.service';
import { UserModel } from 'src/app/shared/models/user-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  user: Usuario | undefined;
  usuarios: UserModel[] = [];

  constructor(
    private authService: AuthenticationService,
    private userSessionService: UserSessionService
  ) {}

  ngOnInit() {
    this.user = this.userSessionService.getUser();
    this.listarUsuarios();
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
  }

  displayedColumns: string[] = ['nome', 'authorities'];

  displayedColumnsTable: string[] = [
    'nome',
    'email',
    'permissao',
    'status',
    'action',
  ];

  getAuthoritiesAsString(user: Usuario): string {
    return user.authorities.join(', ');
  }

  listarUsuarios(): void {
    this.userSessionService.listarUsuarios().subscribe((response) => {
      this.usuarios = response.map((user: any) => {
        let isActivated: boolean = user.status == 'ATIVO' ? true : false;
        return {
          id: user.id,
          nome: user.nome,
          email: user.email,
          senha: user.senha,
          telefone: user.telefone,
          endereco: user.endereco,
          status: user.status,
          isActivated: isActivated,
          permissao: user.permissao,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        };
      });
    });
  }

  toggleStatus(user: UserModel) {
    let newStatus: string = user.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';

    this.userSessionService.updateStatus(user.id, newStatus).subscribe(
      (updatedUser: UserModel) => {
        const userToUpdate = this.usuarios.find((u) => u.id === updatedUser.id);
        if (userToUpdate) {
          userToUpdate.status = updatedUser.status;
        } else {
          console.error('Usuário não encontrado na lista');
        }
      },
      (error) => {
        console.error('Erro ao atualizar o status do usuário:', error);
      }
    );
  }
}
