<template>
  <div class="py-12">
    <div class="container-form">
      <div class="card">
        <div class="text-center mb-6">
          <h1 class="heading-lg">Criar Nova Vakinha</h1>
          <p class="text-muted mt-2">Preencha os dados da sua campanha</p>
        </div>

        <form @submit.prevent="criarVakinha" class="form-grid">
          <!-- Título -->
          <div>
            <label for="titulo" class="form-label">
              Título da Vakinha *
            </label>
            <input
              id="titulo"
              v-model="form.titulo"
              type="text"
              required
              maxlength="100"
              class="form-input"
              :class="{ 'form-input-error': errors.titulo }"
              placeholder="Ex: Ajude o João a comprar uma cadeira de rodas"
            />
            <div class="flex justify-between mt-1">
              <span v-if="errors.titulo" class="text-error">{{ errors.titulo }}</span>
              <span class="text-muted text-sm ml-auto">{{ form.titulo.length }}/100</span>
            </div>
          </div>

          <!-- Descrição -->
          <div>
            <label for="descricao" class="form-label">
              Descrição *
            </label>
            <textarea
              id="descricao"
              v-model="form.descricao"
              required
              rows="6"
              maxlength="1000"
              class="form-input form-textarea"
              :class="{ 'form-input-error': errors.descricao }"
              placeholder="Conte a história da sua vakinha. Explique o motivo, como o dinheiro será usado e por que as pessoas devem contribuir."
            />
            <div class="flex justify-between mt-1">
              <span v-if="errors.descricao" class="text-error">{{ errors.descricao }}</span>
              <span class="text-muted text-sm ml-auto">{{ form.descricao.length }}/1000</span>
            </div>
          </div>

          <!-- Meta Financeira -->
          <div class="grid-2">
            <div>
              <label for="metaFinanceira" class="form-label">
                Meta Financeira (R$) *
              </label>
              <input
                id="metaFinanceira"
                v-model="form.metaFinanceira"
                type="number"
                required
                min="1"
                step="0.01"
                class="form-input"
                :class="{ 'form-input-error': errors.metaFinanceira }"
                placeholder="0,00"
              />
              <span v-if="errors.metaFinanceira" class="text-error text-sm">{{ errors.metaFinanceira }}</span>
            </div>

            <div>
              <label for="dataLimite" class="form-label">
                Data Limite
              </label>
              <input
                id="dataLimite"
                v-model="form.dataLimite"
                type="date"
                class="form-input"
                :min="dataMinima"
              />
            </div>
          </div>

          <!-- Categoria -->
          <div>
            <label for="categoria" class="form-label">
              Categoria *
            </label>
            <select
              id="categoria"
              v-model="form.categoria"
              required
              class="form-input"
              :class="{ 'form-input-error': errors.categoria }"
            >
              <option value="">Selecione uma categoria</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
              <option value="emergencia">Emergência</option>
              <option value="projetos">Projetos Pessoais</option>
              <option value="caridade">Caridade</option>
              <option value="animais">Animais</option>
              <option value="esportes">Esportes</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="outros">Outros</option>
            </select>
            <span v-if="errors.categoria" class="text-error text-sm">{{ errors.categoria }}</span>
          </div>

          <!-- Upload de Imagem -->
          <div>
            <label class="form-label">
              Imagem da Vakinha
            </label>
            <div class="upload-area">
              <div class="space-y-1 text-center">
                <svg
                  class="upload-icon"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-muted">
                  <label
                    for="imagem"
                    class="upload-label"
                  >
                    <span>Escolher arquivo</span>
                    <input
                      id="imagem"
                      type="file"
                      class="hidden"
                      accept="image/*"
                      @change="onImageChange"
                    />
                  </label>
                  <p class="pl-1">ou arraste e solte</p>
                </div>
                <p class="text-xs text-muted">PNG, JPG, GIF até 5MB</p>
              </div>
            </div>
            
            <!-- Preview da imagem -->
            <div v-if="imagePreview" class="mt-4">
              <img :src="imagePreview" alt="Preview" class="image-preview" />
            </div>
          </div>

          <!-- Informações de Contato -->
          <div class="section-divider">
            <h3 class="section-title">Informações de Contato</h3>
            
            <div class="grid-2">
              <div>
                <label for="nomeResponsavel" class="form-label">
                  Nome do Responsável *
                </label>
                <input
                  id="nomeResponsavel"
                  v-model="form.nomeResponsavel"
                  type="text"
                  required
                  class="form-input"
                  :class="{ 'form-input-error': errors.nomeResponsavel }"
                  placeholder="Seu nome"
                />
                <span v-if="errors.nomeResponsavel" class="text-error text-sm">{{ errors.nomeResponsavel }}</span>
              </div>

              <div>
                <label for="emailContato" class="form-label">
                  E-mail de Contato *
                </label>
                <input
                  id="emailContato"
                  v-model="form.emailContato"
                  type="email"
                  required
                  class="form-input"
                  :class="{ 'form-input-error': errors.emailContato }"
                  placeholder="seu@email.com"
                />
                <span v-if="errors.emailContato" class="text-error text-sm">{{ errors.emailContato }}</span>
              </div>
            </div>
          </div>

          <!-- Botões -->
          <div class="button-group">
            <button
              type="button"
              @click="$router.go(-1)"
              class="btn btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="btn btn-primary flex-1"
              :class="{ 'btn-loading': isLoading }"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Criando...
              </span>
              <span v-else>Criar Vakinha</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay">
      <div class="modal">
        <div class="text-center">
          <div class="success-icon">
            <svg class="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="modal-title">Vakinha criada com sucesso!</h3>
          <p class="modal-text">
            Sua vakinha foi criada e já está disponível para receber contribuições.
          </p>
          <div class="modal-buttons">
            <button
              @click="verVakinha"
              class="btn btn-primary w-full"
            >
              Ver minha vakinha
            </button>
            <button
              @click="criarNova"
              class="btn btn-secondary w-full"
            >
              Criar outra vakinha
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVakinhaStore } from '../stores/vakinha'

const router = useRouter()
const vakinhaStore = useVakinhaStore()

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
  imagem: null as File | null,
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

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    form.imagem = file
    
    // Criar preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const validarFormulario = () => {
  // Resetar erros
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')

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
    const resultado = await vakinhaStore.criarVakinha({
      titulo: form.titulo,
      descricao: form.descricao,
      metaFinanceira: parseFloat(form.metaFinanceira),
      dataLimite: form.dataLimite || null,
      categoria: form.categoria,
      imagem: form.imagem,
      nomeResponsavel: form.nomeResponsavel,
      emailContato: form.emailContato
    })

    vakinhaId.value = resultado.id
    showSuccess.value = true
  } catch (error) {
    console.error('Erro ao criar vakinha:', error)
    // Tratar erro
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