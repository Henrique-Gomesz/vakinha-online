import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Usuario {
  id: string
  nome: string
  email: string
  telefone: string
  cpf: string
  dataCriacao: string
}

export interface CriarUsuarioData {
  nome: string
  email: string
  telefone: string
  cpf: string
  senha: string
}

export const useUsuarioStore = defineStore('usuario', () => {
  const usuarios = ref<Usuario[]>([])
  const usuarioAtual = ref<Usuario | null>(null)
  const isLoggedIn = ref(false)

  const criarUsuario = async (dados: CriarUsuarioData): Promise<Usuario> => {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Verificar se email já existe
    const emailExiste = usuarios.value.some(u => u.email === dados.email)
    if (emailExiste) {
      throw new Error('E-mail já cadastrado')
    }

    // Verificar se CPF já existe
    const cpfExiste = usuarios.value.some(u => u.cpf === dados.cpf)
    if (cpfExiste) {
      throw new Error('CPF já cadastrado')
    }

    const novoUsuario: Usuario = {
      id: Date.now().toString(),
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      cpf: dados.cpf,
      dataCriacao: new Date().toISOString()
    }

    usuarios.value.push(novoUsuario)
    usuarioAtual.value = novoUsuario
    isLoggedIn.value = true

    // Salvar no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios.value))
    localStorage.setItem('usuarioAtual', JSON.stringify(novoUsuario))

    return novoUsuario
  }

  const login = async (email: string, senha: string): Promise<Usuario> => {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const usuario = usuarios.value.find(u => u.email === email)
    if (!usuario) {
      throw new Error('Usuário não encontrado')
    }

    // Aqui normalmente verificaríamos a senha
    // Por simplicidade, vamos aceitar qualquer senha
    
    usuarioAtual.value = usuario
    isLoggedIn.value = true
    localStorage.setItem('usuarioAtual', JSON.stringify(usuario))

    return usuario
  }

  const logout = () => {
    usuarioAtual.value = null
    isLoggedIn.value = false
    localStorage.removeItem('usuarioAtual')
  }

  const carregarDadosLocal = () => {
    // Carregar usuários
    const usuariosLocal = localStorage.getItem('usuarios')
    if (usuariosLocal) {
      usuarios.value = JSON.parse(usuariosLocal)
    }

    // Carregar usuário atual
    const usuarioLocal = localStorage.getItem('usuarioAtual')
    if (usuarioLocal) {
      usuarioAtual.value = JSON.parse(usuarioLocal)
      isLoggedIn.value = true
    }
  }

  const buscarUsuarioPorId = (id: string): Usuario | undefined => {
    return usuarios.value.find(u => u.id === id)
  }

  return {
    usuarios,
    usuarioAtual,
    isLoggedIn,
    criarUsuario,
    login,
    logout,
    carregarDadosLocal,
    buscarUsuarioPorId
  }
})