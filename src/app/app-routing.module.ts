import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';

import { PaginaNaoEncontradaComponent } from './core/template/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/template/pages/nao-autorizado/nao-autorizado.component';
import { RegistrationComponent } from './core/auth/pages/registration/registration.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { HomePageComponent } from './core/home/pages/home-page/home-page.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {path: 'register', component:RegistrationComponent},
      {path: 'home', component:HomePageComponent},
      {
        path: 'pagina-nao-encontrada',
        component: PaginaNaoEncontradaComponent,
    },
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },

    ],
    canActivate: [()=> inject(AuthGuard).canActivate()]
  },
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'pagina-nao-encontrada'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
