import api from './api'

export interface Vakinha {
  _id?: string
  titulo: string
  descricao: string
  metaFinanceira: number
  arrecadado?: number
  dataLimite?: string
  categoria: string
  imagem?: string
  nomeResponsavel: string
  emailContato: string
  ativo?: boolean
  contribuicoes?: string[]
  createdAt?: string
  updatedAt?: string
}

class VakinhaService {
  // Buscar todas as vakinhas (com filtro opcional por categoria)
  async getAll(categoria?: string): Promise<Vakinha[]> {
    const params = categoria && categoria !== 'todas' ? { categoria } : {}
    const response = await api.get('/api/vakinhas', { params })
    return response.data
  }

  // Buscar vakinha por ID
  async getById(id: string): Promise<Vakinha> {
    const response = await api.get(`/api/vakinhas/${id}`)
    return response.data
  }

  // Buscar vakinhas por categoria
  async getByCategoria(categoria: string): Promise<Vakinha[]> {
    const response = await api.get(`/api/vakinhas/categoria/${categoria}`)
    return response.data
  }

  // Criar nova vakinha
  async create(vakinha: Vakinha): Promise<Vakinha> {
    const response = await api.post('/api/vakinhas', vakinha)
    return response.data
  }

  // Atualizar vakinha
  async update(id: string, vakinha: Partial<Vakinha>): Promise<Vakinha> {
    const response = await api.put(`/api/vakinhas/${id}`, vakinha)
    return response.data
  }

  // Deletar vakinha
  async delete(id: string): Promise<void> {
    await api.delete(`/api/vakinhas/${id}`)
  }
}

export default new VakinhaService()
