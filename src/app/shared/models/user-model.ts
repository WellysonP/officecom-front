export interface UserModel {
  id: number
  nome: string
  email: string
  senha: string
  telefone: string
  endereco: string
  status: string
  permissao: string
  createdAt: Date
  updatedAt: Date
  isActivated: boolean
}
