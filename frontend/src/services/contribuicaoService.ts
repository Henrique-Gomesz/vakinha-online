import api from './api'

export interface Contribuicao {
  _id?: string
  vakinhaId: string
  nomeContribuidor: string
  emailContribuidor: string
  valor: number
  mensagem?: string
  anonimo?: boolean
  createdAt?: string
  updatedAt?: string
}

class ContribuicaoService {
  // Buscar todas as contribuições
  async getAll(): Promise<Contribuicao[]> {
    const response = await api.get('/api/contribuicoes')
    return response.data
  }

  // Buscar contribuição por ID
  async getById(id: string): Promise<Contribuicao> {
    const response = await api.get(`/api/contribuicoes/${id}`)
    return response.data
  }

  // Buscar contribuições por vakinha
  async getByVakinha(vakinhaId: string): Promise<Contribuicao[]> {
    const response = await api.get(`/api/vakinhas/${vakinhaId}/contribuicoes`)
    return response.data
  }

  // Criar nova contribuição
  async create(contribuicao: Contribuicao): Promise<Contribuicao> {
    const response = await api.post('/api/contribuicoes', contribuicao)
    return response.data
  }

  // Deletar contribuição
  async delete(id: string): Promise<void> {
    await api.delete(`/api/contribuicoes/${id}`)
  }
}

export default new ContribuicaoService()
