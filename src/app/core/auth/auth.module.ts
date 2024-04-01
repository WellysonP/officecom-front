import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaoAutorizadoComponent } from '../template/pages/nao-autorizado/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from '../template/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';





@NgModule({
  declarations: [
    NaoAutorizadoComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
