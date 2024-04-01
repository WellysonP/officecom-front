export class Usuario {
  constructor(
    public login: string,
    public nome: string,
    public authorities: string[],
    public activated: boolean
  ){}
}
