import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './pages/nao-autorizado/nao-autorizado.component';



@NgModule({
  declarations: [
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TemplateModule { }
