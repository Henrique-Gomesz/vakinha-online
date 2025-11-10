<template>
  <div class="page-container">
    <div class="form-container">
      <div class="form-header">
        <h1 class="form-title">Criar Conta</h1>
        <p class="form-subtitle">Cadastre-se para criar suas vakinhas</p>
      </div>

      <form @submit.prevent="criarUsuario" class="form">
        <div class="field">
          <label for="nome" class="field-label">
            Nome Completo *
          </label>
          <input
            id="nome"
            v-model="form.nome"
            type="text"
            required
            class="field-input"
            :class="{ 'field-error': errors.nome }"
            placeholder="Digite seu nome completo"
          />
          <span v-if="errors.nome" class="error-message">{{ errors.nome }}</span>
        </div>

      
        <div class="field">
          <label for="email" class="field-label">E-mail *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="field-input"
            :class="{ 'field-error': errors.email }"
            placeholder="seu@email.com"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

    
        <div class="field">
          <label for="telefone" class="field-label">Telefone *</label>
          <input
            id="telefone"
            v-model="form.telefone"
            type="tel"
            required
            class="field-input"
            :class="{ 'field-error': errors.telefone }"
            placeholder="(11) 99999-9999"
            @input="onTelefoneInput"
          />
          <span v-if="errors.telefone" class="error-message">{{ errors.telefone }}</span>
        </div>

        <!-- CPF -->
        <div class="field">
          <label for="cpf" class="field-label">CPF *</label>
          <input
            id="cpf"
            v-model="form.cpf"
            type="text"
            required
            class="field-input"
            :class="{ 'field-error': errors.cpf }"
            placeholder="000.000.000-00"
            maxlength="14"
            @input="onCPFInput"
          />
          <span v-if="errors.cpf" class="error-message">{{ errors.cpf }}</span>
        </div>

        <!-- Senha -->
        <div class="field">
          <label for="senha" class="field-label">Senha *</label>
          <input
            id="senha"
            v-model="form.senha"
            type="password"
            required
            class="field-input"
            :class="{ 'field-error': errors.senha }"
            placeholder="Mínimo 6 caracteres"
          />
          <span v-if="errors.senha" class="error-message">{{ errors.senha }}</span>
        </div>

        <!-- Confirmar Senha -->
        <div class="field">
          <label for="confirmarSenha" class="field-label">Confirmar Senha *</label>
          <input
            id="confirmarSenha"
            v-model="form.confirmarSenha"
            type="password"
            required
            class="field-input"
            :class="{ 'field-error': errors.confirmarSenha }"
            placeholder="Digite a senha novamente"
          />
          <span v-if="errors.confirmarSenha" class="error-message">{{ errors.confirmarSenha }}</span>
        </div>

        <!-- Termos -->
        <div class="terms-field">
          <input
            id="aceitarTermos"
            v-model="form.aceitarTermos"
            type="checkbox"
            required
            class="terms-checkbox"
          />
          <label for="aceitarTermos" class="terms-label">
            Aceito os 
            <a href="#" class="terms-link">termos de uso</a> 
            e 
            <a href="#" class="terms-link">política de privacidade</a>
          </label>
        </div>

        <!-- Botão Submit -->
        <button type="submit" :disabled="isLoading" class="submit-btn">
          <span v-if="isLoading" class="loading-content">
            <svg class="loading-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Criando conta...
          </span>
          <span v-else>Criar Conta</span>
        </button>
      </form>

      <!-- Links -->
      <div class="form-links">
        Já tem uma conta? 
        <router-link to="/login" class="link">Fazer login</router-link>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <div class="modal-icon">
            <svg class="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="modal-title">Conta criada com sucesso!</h3>
          <p class="modal-text">
            Sua conta foi criada. Agora você pode criar suas vakinhas.
          </p>
          <button @click="irParaCriarVakinha" class="btn btn-primary w-full">
            Criar minha primeira vakinha
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import usuarioService from '../services/usuarioService'

const router = useRouter()

const isLoading = ref(false)
const showSuccess = ref(false)

const form = reactive({
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  senha: '',
  confirmarSenha: '',
  aceitarTermos: false
})

const errors = reactive({
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  senha: '',
  confirmarSenha: ''
})

// Função para formatar CPF
const formatarCPF = (cpf: string) => {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

// Validações
const validarFormulario = () => {
  // Resetar erros
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')

  let isValid = true

  if (!form.nome.trim()) {
    errors.nome = 'Nome é obrigatório'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'E-mail é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'E-mail inválido'
    isValid = false
  }

  if (!form.telefone.trim()) {
    errors.telefone = 'Telefone é obrigatório'
    isValid = false
  }

  if (!form.cpf.trim()) {
    errors.cpf = 'CPF é obrigatório'
    isValid = false
  } else if (form.cpf.replace(/\D/g, '').length !== 11) {
    errors.cpf = 'CPF deve ter 11 dígitos'
    isValid = false
  }

  if (!form.senha) {
    errors.senha = 'Senha é obrigatória'
    isValid = false
  } else if (form.senha.length < 6) {
    errors.senha = 'Senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  if (!form.confirmarSenha) {
    errors.confirmarSenha = 'Confirmação de senha é obrigatória'
    isValid = false
  } else if (form.senha !== form.confirmarSenha) {
    errors.confirmarSenha = 'Senhas não conferem'
    isValid = false
  }

  return isValid
}

const criarUsuario = async () => {
  if (!validarFormulario()) {
    return
  }

  isLoading.value = true

  try {
    // Remover a formatação do CPF e telefone antes de enviar
    const cpfLimpo = form.cpf.replace(/\D/g, '')
    const telefoneLimpo = form.telefone.replace(/\D/g, '')

    await usuarioService.create({
      nome: form.nome,
      email: form.email,
      telefone: telefoneLimpo,
      cpf: cpfLimpo,
      senha: form.senha
    })

    showSuccess.value = true
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error)
    
    // Exibir mensagem de erro específica
    if (error.response?.data?.message) {
      alert(error.response.data.message)
    } else {
      alert('Erro ao criar usuário. Tente novamente.')
    }
  } finally {
    isLoading.value = false
  }
}

const irParaCriarVakinha = () => {
  showSuccess.value = false
  router.push('/criar-vakinha')
}

// Formatação automática do CPF
const onCPFInput = () => {
  form.cpf = formatarCPF(form.cpf)
}

// Formatação automática do telefone
const formatarTelefone = (telefone: string) => {
  return telefone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

const onTelefoneInput = () => {
  form.telefone = formatarTelefone(form.telefone)
}
</script>

<style scoped>
.page-container {
  padding: 3rem 0;
  background-color: var(--gray-50);
  min-height: 100vh;
}

.form-container {
  max-width: 28rem;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
}

.form-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
}

.form-subtitle {
  color: var(--gray-600);
  margin-top: 0.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.25rem;
}

.field-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  transition: var(--transition);
}

.field-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 2px var(--primary-500), 0 0 0 4px var(--primary-100);
}

.field-input.field-error {
  border-color: var(--red-500);
}

.error-message {
  color: var(--red-500);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.terms-field {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.terms-checkbox {
  margin-top: 0.25rem;
  width: 1rem;
  height: 1rem;
  color: var(--primary-600);
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius-sm);
}

.terms-label {
  font-size: 0.875rem;
  color: var(--gray-700);
  line-height: 1.4;
}

.terms-link {
  color: var(--primary-600);
  text-decoration: none;
}

.terms-link:hover {
  color: var(--primary-500);
}

.submit-btn {
  width: 100%;
  background-color: var(--primary-600);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--primary-700);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  animation: spin 1s linear infinite;
  color: #ffffff;
}

.form-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.link {
  color: var(--primary-600);
  text-decoration: none;
}

.link:hover {
  color: var(--primary-500);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(75, 85, 99, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
}

.modal {
  background-color: #ffffff;
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  max-width: 24rem;
  width: 100%;
}

.modal-content {
  text-align: center;
}

.modal-icon {
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--success-100);
  border-radius: 50%;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.modal-text {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin-bottom: 1rem;
}
</style>