import api from './api'

export interface Usuario {
  _id?: string
  nome: string
  email: string
  telefone: string
  cpf: string
  senha?: string
  ativo?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface LoginData {
  email: string
  senha: string
}

export interface LoginResponse {
  message: string
  usuario: Usuario
}

class UsuarioService {
  // Buscar todos os usuários
  async getAll(): Promise<Usuario[]> {
    const response = await api.get('/api/usuarios')
    return response.data
  }

  // Buscar usuário por ID
  async getById(id: string): Promise<Usuario> {
    const response = await api.get(`/api/usuarios/${id}`)
    return response.data
  }

  // Criar novo usuário
  async create(usuario: Usuario): Promise<Usuario> {
    const response = await api.post('/api/usuarios', usuario)
    return response.data
  }

  // Atualizar usuário
  async update(id: string, usuario: Partial<Usuario>): Promise<Usuario> {
    const response = await api.put(`/api/usuarios/${id}`, usuario)
    return response.data
  }

  // Deletar usuário
  async delete(id: string): Promise<void> {
    await api.delete(`/api/usuarios/${id}`)
  }

  // Login
  async login(loginData: LoginData): Promise<LoginResponse> {
    const response = await api.post('/api/usuarios/login', loginData)
    return response.data
  }
}

export default new UsuarioService()
