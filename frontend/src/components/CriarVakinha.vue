
<template>
  <div class="criar-vakinha">
    <div class="container">
      <div class="form-container">
        <div class="header">
          <h1>Criar Nova Vakinha</h1>
          <p>Preencha os dados da sua campanha</p>
        </div>

        <form @submit.prevent="criarVakinha" class="vakinha-form">
          <div class="form-group">
            <label for="titulo">Título da Vakinha *</label>
            <input
              type="text"
              id="titulo"
              v-model="form.titulo"
              :class="['form-input', errors.titulo ? 'error' : '']"
              maxlength="100"
              placeholder="Ex: Ajude o João a comprar uma cadeira de rodas"
            />
            <div class="input-footer">
              <span v-if="errors.titulo" class="error-text">{{ errors.titulo }}</span>
              <span class="char-count">{{ form.titulo.length }}/100</span>
            </div>
          </div>

          <div class="form-group">
            <label for="descricao">Descrição *</label>
            <textarea
              id="descricao"
              v-model="form.descricao"
              :class="['form-input', errors.descricao ? 'error' : '']"
              maxlength="1000"
              placeholder="Conte a história da sua vakinha. Explique o motivo, como o dinheiro será usado e por que as pessoas devem contribuir."
            ></textarea>
            <div class="input-footer">
              <span v-if="errors.descricao" class="error-text">{{ errors.descricao }}</span>
              <span class="char-count">{{ form.descricao.length }}/1000</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="metaFinanceira">Meta Financeira (R$) *</label>
              <input
                type="number"
                id="metaFinanceira"
                v-model="form.metaFinanceira"
                :class="['form-input', errors.metaFinanceira ? 'error' : '']"
                min="0"
                step="0.01"
                placeholder="Ex: 5000.00"
              />
              <span v-if="errors.metaFinanceira" class="error-text">{{ errors.metaFinanceira }}</span>
            </div>

            <div class="form-group">
              <label for="dataLimite">Data Limite</label>
              <input
                type="date"
                id="dataLimite"
                v-model="form.dataLimite"
                class="form-input"
                :min="dataMinima"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="categoria">Categoria *</label>
            <select
              id="categoria"
              v-model="form.categoria"
              :class="['form-input', errors.categoria ? 'error' : '']"
            >
              <option value="">Selecione uma categoria</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
              <option value="emergencia">Emergência</option>
              <option value="projetos">Projetos</option>
              <option value="caridade">Caridade</option>
              <option value="animais">Animais</option>
              <option value="esportes">Esportes</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="outros">Outros</option>
            </select>
            <span v-if="errors.categoria" class="error-text">{{ errors.categoria }}</span>
          </div>

          <div class="form-group">
            <label>Imagem da Campanha</label>
            <div 
              class="upload-area"
              @dragover.prevent
              @drop.prevent="onImageDrop"
            >
              <div v-if="!imagePreview" class="upload-content">
                <svg class="upload-icon" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <div class="upload-text">
                  <span>Arraste e solte uma imagem ou</span>
                  <label class="upload-label">
                    busque no seu computador
                    <input
                      type="file"
                      class="hidden"
                      accept="image/*"
                      @change="onImageChange"
                    >
                  </label>
                </div>
                <p class="upload-hint">PNG, JPG até 5MB</p>
              </div>
              <div v-else class="image-preview">
                <img :src="imagePreview" alt="Preview">
              </div>
            </div>
          </div>

          <div class="section-divider">
            <h3>Dados de Contato</h3>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="nomeResponsavel">Nome do Responsável *</label>
              <input
                type="text"
                id="nomeResponsavel"
                v-model="form.nomeResponsavel"
                :class="['form-input', errors.nomeResponsavel ? 'error' : '']"
                placeholder="Seu nome completo"
              />
              <span v-if="errors.nomeResponsavel" class="error-text">{{ errors.nomeResponsavel }}</span>
            </div>

            <div class="form-group">
              <label for="emailContato">E-mail de Contato *</label>
              <input
                type="email"
                id="emailContato"
                v-model="form.emailContato"
                :class="['form-input', errors.emailContato ? 'error' : '']"
                placeholder="Ex: joao@email.com"
              />
              <span v-if="errors.emailContato" class="error-text">{{ errors.emailContato }}</span>
            </div>
          </div>

          <div class="form-actions">
            <button
              type="button"
              class="btn btn-secondary"
              @click="$router.push('/vakinhas')"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Criar Vakinha</span>
              <div v-else class="loading-content">
                <svg class="spinner" viewBox="0 0 50 50">
                  <circle class="spinner-circle" cx="25" cy="25" r="20"></circle>
                  <circle class="spinner-path" cx="25" cy="25" r="20"></circle>
                </svg>
                <span>Criando...</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showSuccess" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <div class="success-icon">
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3>Vakinha criada com sucesso!</h3>
          <p>Sua vakinha foi criada e já está disponível para receber contribuições.</p>
          <div class="modal-actions">
            <button class="btn btn-primary full-width" @click="verVakinha">
              Ver minha Vakinha
            </button>
            <button class="btn btn-secondary full-width" @click="criarNova">
              Criar outra Vakinha
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import vakinhaService from '../services/vakinhaService'

const router = useRouter()

const isLoading = ref(false)
const showSuccess = ref(false)
const imagePreview = ref('')
const vakinhaId = ref('')

const form = reactive({
  titulo: '',
  descricao: '',
  metaFinanceira: '',
  dataLimite: '',
  categoria: '',
  imagem: null,
  nomeResponsavel: '',
  emailContato: ''
})

const errors = reactive({
  titulo: '',
  descricao: '',
  metaFinanceira: '',
  categoria: '',
  nomeResponsavel: '',
  emailContato: ''
})

// Data mínima (hoje)
const dataMinima = computed(() => {
  const hoje = new Date()
  return hoje.toISOString().split('T')[0]
})

const onImageChange = (event) => {
  const target = event.target
  const file = target.files?.[0]
  
  if (file) {
    form.imagem = file
    
    // Criar preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const onImageDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    form.imagem = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const validarFormulario = () => {
  // Resetar erros
  Object.keys(errors).forEach(key => errors[key] = '')

  let isValid = true

  if (!form.titulo.trim()) {
    errors.titulo = 'Título é obrigatório'
    isValid = false
  }

  if (!form.descricao.trim()) {
    errors.descricao = 'Descrição é obrigatória'
    isValid = false
  }

  if (!form.metaFinanceira || parseFloat(form.metaFinanceira) <= 0) {
    errors.metaFinanceira = 'Meta financeira deve ser maior que R$ 0'
    isValid = false
  }

  if (!form.categoria) {
    errors.categoria = 'Categoria é obrigatória'
    isValid = false
  }

  if (!form.nomeResponsavel.trim()) {
    errors.nomeResponsavel = 'Nome do responsável é obrigatório'
    isValid = false
  }

  if (!form.emailContato.trim()) {
    errors.emailContato = 'E-mail de contato é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailContato)) {
    errors.emailContato = 'E-mail inválido'
    isValid = false
  }

  return isValid
}

const criarVakinha = async () => {
  if (!validarFormulario()) {
    return
  }

  isLoading.value = true

  try {
    const vakinhaData = {
      titulo: form.titulo,
      descricao: form.descricao,
      metaFinanceira: parseFloat(form.metaFinanceira),
      dataLimite: form.dataLimite || undefined,
      categoria: form.categoria,
      imagem: imagePreview.value || undefined,
      nomeResponsavel: form.nomeResponsavel,
      emailContato: form.emailContato
    }

    const vakinhaCriada = await vakinhaService.create(vakinhaData)
    vakinhaId.value = vakinhaCriada._id || ''
    showSuccess.value = true
  } catch (error) {
    console.error('Erro ao criar vakinha:', error)
    alert('Erro ao criar vakinha. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}

const verVakinha = () => {
  showSuccess.value = false
  router.push(`/vakinha/${vakinhaId.value}`)
}

const criarNova = () => {
  showSuccess.value = false
  // Reset form
  form.titulo = ''
  form.descricao = ''
  form.metaFinanceira = ''
  form.dataLimite = ''
  form.categoria = ''
  form.imagem = null
  form.nomeResponsavel = ''
  form.emailContato = ''
  imagePreview.value = ''
}
</script>

<style scoped>
.criar-vakinha {
  min-height: 100vh;
  background: linear-gradient(135deg, #99abf4 0%, #2954f0 100%);
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.form-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin: 2rem 0;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.header p {
  color: #718096;
  font-size: 1.1rem;
}

.vakinha-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
}

.form-input {
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error {
  border-color: #e53e3e;
  background: #fed7d7;
}

.form-input::placeholder {
  color: #a0aec0;
}

textarea.form-input {
  resize: vertical;
  min-height: 150px;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.error-text {
  color: #e53e3e;
  font-weight: 500;
}

.char-count {
  color: #718096;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.upload-area {
  border: 2px dashed #cbd5e0;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #667eea;
  background: #eef4ff;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #a0aec0;
  stroke: currentColor;
  fill: none;
}

.upload-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
}

.upload-label {
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
}

.upload-label:hover {
  color: #5a67d8;
}

.hidden {
  display: none;
}

.upload-hint {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0;
}

.image-preview {
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.section-divider {
  border-top: 2px solid #e2e8f0;
  padding-top: 2rem;
  margin-top: 1rem;
}

.section-divider h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.form-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #1933c7 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.loading {
  opacity: 0.8;
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.spinner-circle {
  opacity: 0.25;
  stroke: currentColor;
  stroke-width: 4;
  fill: none;
}

.spinner-path {
  opacity: 0.75;
  fill: currentColor;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.modal-content {
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #48bb78, #38a169);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.success-icon svg {
  width: 40px;
  height: 40px;
  color: white;
  stroke: currentColor;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.modal-content h3 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.full-width {
  width: 100%;
}

@media (max-width: 768px) {
  .form-container {
    padding: 2rem 1.5rem;
    margin: 1rem 0;
    border-radius: 16px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .form-actions {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }

  .modal {
    padding: 2rem;
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }

  .form-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 1.75rem;
  }

  .vakinha-form {
    gap: 1.5rem;
  }
}
</style>