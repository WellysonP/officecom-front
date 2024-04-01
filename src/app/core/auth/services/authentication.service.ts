import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/shared/models/login';
import { Observable, map, switchMap, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserSessionService } from './user-session.service';
import { Register } from 'src/app/shared/models/register';
import { Router } from '@angular/router';


type JwtToken = {
  access_token: string;
}

type JwtPayLoad = {
  iss: string;
  upn: string;
  groups: Array<string>;
  full_name: string;
  exp: number;
  iat: number;
  jti: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly SERVER_API_URL = environment.api;

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UserSessionService,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
  ) { }

  login(credentials: Login): Observable<void> {
    return this.http.
      post<JwtToken>(
        this.SERVER_API_URL + '/api/auth/login',
        credentials,
      ).pipe(
        map((response) => this.authenticateSuccess(response, true))
      );
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.access_token;
    if (rememberMe) {
      this.$localStorage.store('access_token', jwt);
    } else {
      this.$sessionStorage.store('access_token', jwt);
    }

    this.authenticate(response.access_token);
  }

  private authenticate(token: string): void {
    const jwtPayload = this.jwtDecodeToPayload(token);
    if (jwtPayload) {
      this.usuarioService.authenticate({
        login: jwtPayload.upn,
        activated: true,
        authorities: jwtPayload.groups,
        nome: jwtPayload.full_name
      });
    } else {
      console.error('Payload do JWT é nulo.');
    }
  }

  private jwtDecodeToPayload(token: string): JwtPayLoad | null {
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }

  forceAuthenticate() {
    const token = this.getAccessToken();
    if (token) this.authenticate(token);
  }

  private getAccessToken(): string {
    return (
      this.$localStorage.retrieve('access_token') ||
      this.$sessionStorage.retrieve('access_token')
  );
  }

  register(credentials: Register): Observable<any> {
    const url = this.SERVER_API_URL + "/api/usuarios";
    return this.http
      .post(url, credentials)
  }

  registerAndLogin(registerData: Register): Observable<any> {
    return this.register(registerData).pipe(
      switchMap(() => {
        return this.login({
          email: registerData.email,
          senha: registerData.senha
        });
      })
    );
  }

  logout() {
    this.$localStorage.clear('access_token');
    this.$sessionStorage.clear('access_token');
    this.usuarioService.clean();
    this.router.navigate(['login']);
}
}
