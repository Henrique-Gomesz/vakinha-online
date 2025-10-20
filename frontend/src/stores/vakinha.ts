import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Vakinha {
  id: string
  titulo: string
  descricao: string
  metaFinanceira: number
  arrecadado: number
  dataLimite: string | null
  categoria: string
  imagem: string | null
  nomeResponsavel: string
  emailContato: string
  usuarioId: string
  dataCriacao: string
  ativa: boolean
  totalContribuicoes: number
}

export interface CriarVakinhaData {
  titulo: string
  descricao: string
  metaFinanceira: number
  dataLimite: string | null
  categoria: string
  imagem: File | null
  nomeResponsavel: string
  emailContato: string
}

export interface Contribuicao {
  id: string
  vakinhaId: string
  valor: number
  nomeContribuidor: string
  emailContribuidor: string
  mensagem: string
  dataContribuicao: string
  anonimo: boolean
}

export const useVakinhaStore = defineStore('vakinha', () => {
  const vakinhas = ref<Vakinha[]>([])
  const contribuicoes = ref<Contribuicao[]>([])

  const criarVakinha = async (dados: CriarVakinhaData): Promise<{ id: string }> => {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simular upload de imagem se houver
    let imagemUrl = null
    if (dados.imagem) {
      // Em uma aplicação real, faria upload para um serviço de storage
      imagemUrl = URL.createObjectURL(dados.imagem)
    }

    const novaVakinha: Vakinha = {
      id: Date.now().toString(),
      titulo: dados.titulo,
      descricao: dados.descricao,
      metaFinanceira: dados.metaFinanceira,
      arrecadado: 0,
      dataLimite: dados.dataLimite,
      categoria: dados.categoria,
      imagem: imagemUrl,
      nomeResponsavel: dados.nomeResponsavel,
      emailContato: dados.emailContato,
      usuarioId: 'user1', // Em uma aplicação real, pegaria do usuário logado
      dataCriacao: new Date().toISOString(),
      ativa: true,
      totalContribuicoes: 0
    }

    vakinhas.value.push(novaVakinha)
    
    // Salvar no localStorage
    localStorage.setItem('vakinhas', JSON.stringify(vakinhas.value))

    return { id: novaVakinha.id }
  }

  const carregarVakinhas = () => {
    // Carregar do localStorage
    const vakinhasLocal = localStorage.getItem('vakinhas')
    if (vakinhasLocal) {
      vakinhas.value = JSON.parse(vakinhasLocal)
    } else {
      // Dados de exemplo se não houver dados salvos
      vakinhas.value = [
        {
          id: '1',
          titulo: 'Ajude a Maria a comprar uma cadeira de rodas',
          descricao: 'Maria, de 65 anos, precisa de uma cadeira de rodas para melhorar sua mobilidade e qualidade de vida. Sua família não tem condições de arcar com esse custo. Vamos ajudá-la?',
          metaFinanceira: 3500,
          arrecadado: 1200,
          dataLimite: '2025-12-31',
          categoria: 'saude',
          imagem: null,
          nomeResponsavel: 'João Silva',
          emailContato: 'joao@email.com',
          usuarioId: 'user1',
          dataCriacao: '2025-10-01T10:00:00Z',
          ativa: true,
          totalContribuicoes: 8
        },
        {
          id: '2',
          titulo: 'Formatura da Ana - Engenharia Civil',
          descricao: 'Depois de 5 anos de muito estudo e dedicação, Ana está prestes a se formar em Engenharia Civil. Ajude ela com os custos da formatura!',
          metaFinanceira: 2000,
          arrecadado: 850,
          dataLimite: '2025-11-15',
          categoria: 'educacao',
          imagem: null,
          nomeResponsavel: 'Ana Costa',
          emailContato: 'ana@email.com',
          usuarioId: 'user2',
          dataCriacao: '2025-10-05T14:30:00Z',
          ativa: true,
          totalContribuicoes: 12
        },
        {
          id: '3',
          titulo: 'Cirurgia de emergência para o Rex',
          descricao: 'Rex, um golden retriever de 8 anos, precisa de uma cirurgia urgente. Seus donos não têm condições de pagar o procedimento. Ajude o Rex!',
          metaFinanceira: 1500,
          arrecadado: 400,
          dataLimite: '2025-10-25',
          categoria: 'animais',
          imagem: null,
          nomeResponsavel: 'Carlos Santos',
          emailContato: 'carlos@email.com',
          usuarioId: 'user3',
          dataCriacao: '2025-10-10T09:15:00Z',
          ativa: true,
          totalContribuicoes: 6
        }
      ]
      localStorage.setItem('vakinhas', JSON.stringify(vakinhas.value))
    }

    // Carregar contribuições
    const contribuicoesLocal = localStorage.getItem('contribuicoes')
    if (contribuicoesLocal) {
      contribuicoes.value = JSON.parse(contribuicoesLocal)
    }
  }

  const buscarVakinhaPorId = (id: string): Vakinha | undefined => {
    return vakinhas.value.find(v => v.id === id)
  }

  const contribuir = async (vakinhaId: string, dados: {
    valor: number
    nomeContribuidor: string
    emailContribuidor: string
    mensagem: string
    anonimo: boolean
  }): Promise<void> => {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const vakinha = buscarVakinhaPorId(vakinhaId)
    if (!vakinha) {
      throw new Error('Vakinha não encontrada')
    }

    // Criar contribuição
    const novaContribuicao: Contribuicao = {
      id: Date.now().toString(),
      vakinhaId,
      valor: dados.valor,
      nomeContribuidor: dados.nomeContribuidor,
      emailContribuidor: dados.emailContribuidor,
      mensagem: dados.mensagem,
      dataContribuicao: new Date().toISOString(),
      anonimo: dados.anonimo
    }

    contribuicoes.value.push(novaContribuicao)

    // Atualizar vakinha
    vakinha.arrecadado += dados.valor
    vakinha.totalContribuicoes += 1

    // Salvar no localStorage
    localStorage.setItem('vakinhas', JSON.stringify(vakinhas.value))
    localStorage.setItem('contribuicoes', JSON.stringify(contribuicoes.value))
  }

  const obterContribuicoesVakinha = (vakinhaId: string): Contribuicao[] => {
    return contribuicoes.value.filter(c => c.vakinhaId === vakinhaId)
  }

  const vakinhasAtivasCount = () => {
    return vakinhas.value.filter(v => v.ativa).length
  }

  const totalArrecadado = () => {
    return vakinhas.value.reduce((total, v) => total + v.arrecadado, 0)
  }

  const totalContribuicoes = () => {
    return vakinhas.value.reduce((total, v) => total + v.totalContribuicoes, 0)
  }

  return {
    vakinhas,
    contribuicoes,
    criarVakinha,
    carregarVakinhas,
    buscarVakinhaPorId,
    contribuir,
    obterContribuicoesVakinha,
    vakinhasAtivasCount,
    totalArrecadado,
    totalContribuicoes
  }
})