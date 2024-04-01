import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario-model';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Cookies from 'js-cookie';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';



@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private usuarioLogado: Usuario | null = null;
  private authenticationState = new ReplaySubject<Usuario | null>(1);
  private readonly SERVER_API_URL = environment.api;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService

  ) { }

  listarUsuarios(): Observable<any> {
    const url = this.SERVER_API_URL + "/api/usuarios";
    const token = this.localStorage.retrieve('access_token') || this.sessionStorage.retrieve('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(
      url, { headers }
    ).pipe()
  }

  updateStatus(id: number, status: string): Observable<any> {
    const body = { status: status };
    const url = this.SERVER_API_URL + `/api/usuarios/${id}`;
    const token = this.localStorage.retrieve('access_token') || this.sessionStorage.retrieve('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put(
      url, body, { headers }
    ).pipe()
  }

  authenticate(usuarioLogado: Usuario | null): void {
    this.usuarioLogado = usuarioLogado;
    this.authenticationState.next(this.usuarioLogado);
  }

  isAuthenticated(): boolean {
    return this.usuarioLogado !== null;
  }

  clean() {
    this.authenticate(null)
  }

  getUser(): Usuario {
    return this.usuarioLogado ? this.usuarioLogado : {
      login: "",
      nome: "",
      authorities: [],
      activated: false
    }
  }
}
