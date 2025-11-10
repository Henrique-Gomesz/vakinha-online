<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-gray-600">Carregando vakinha...</p>
      </div>

      <!-- Conteúdo da Vakinha -->
      <div v-else-if="vakinha" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="md:grid md:grid-cols-2 gap-8">
          <!-- Imagem -->
          <div class="h-96 md:h-full bg-gray-200">
            <img
              v-if="vakinha.imagem"
              :src="vakinha.imagem"
              :alt="vakinha.titulo"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
              <svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <!-- Informações -->
          <div class="p-8">
            <!-- Categoria -->
            <span class="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full mb-4">
              {{ getCategoriaLabel(vakinha.categoria) }}
            </span>

            <!-- Título -->
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              {{ vakinha.titulo }}
            </h1>

            <!-- Responsável -->
            <div class="mb-6 flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Responsável: <strong>{{ vakinha.nomeResponsavel }}</strong></span>
            </div>

            <!-- Progress -->
            <div class="mb-6">
              <div class="flex justify-between items-baseline mb-2">
                <span class="text-3xl font-bold text-primary-600">
                  R$ {{ formatarMoeda(vakinha.arrecadado || 0) }}
                </span>
                <span class="text-gray-500">
                  de R$ {{ formatarMoeda(vakinha.metaFinanceira) }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  class="bg-primary-600 h-3 rounded-full transition-all"
                  :style="{ width: `${calcularPorcentagem()}%` }"
                ></div>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="font-semibold text-primary-600">
                  {{ calcularPorcentagem() }}% alcançado
                </span>
                <span v-if="vakinha.dataLimite" class="text-gray-500">
                  {{ formatarDiasRestantes(vakinha.dataLimite) }}
                </span>
              </div>
            </div>

            <!-- Botão Contribuir -->
            <button
              @click="mostrarFormContribuicao = true"
              class="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg mb-4"
            >
              Contribuir Agora
            </button>

            <!-- Botão Voltar -->
            <router-link
              to="/vakinhas"
              class="block w-full text-center bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Voltar para Vakinhas
            </router-link>
          </div>
        </div>

        <!-- Descrição -->
        <div class="px-8 py-6 border-t border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Sobre esta vakinha</h2>
          <p class="text-gray-700 whitespace-pre-line leading-relaxed">
            {{ vakinha.descricao }}
          </p>
        </div>

        <!-- Contribuições -->
        <div class="px-8 py-6 border-t border-gray-200 bg-gray-50">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Contribuições ({{ contribuicoes.length }})
          </h2>

          <div v-if="contribuicoes.length > 0" class="space-y-4">
            <div
              v-for="contribuicao in contribuicoes"
              :key="contribuicao._id"
              class="bg-white p-4 rounded-lg shadow-sm"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <p class="font-semibold text-gray-900">
                    {{ contribuicao.anonimo ? 'Anônimo' : contribuicao.nomeContribuidor }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ formatarData(contribuicao.createdAt!) }}
                  </p>
                </div>
                <span class="text-lg font-bold text-primary-600">
                  R$ {{ formatarMoeda(contribuicao.valor) }}
                </span>
              </div>
              <p v-if="contribuicao.mensagem" class="text-gray-700 mt-2">
                {{ contribuicao.mensagem }}
              </p>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            <p>Ainda não há contribuições. Seja o primeiro a contribuir!</p>
          </div>
        </div>
      </div>

      <!-- Erro -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Vakinha não encontrada</h3>
        <router-link to="/vakinhas" class="mt-6 inline-block bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium">
          Ver Todas as Vakinhas
        </router-link>
      </div>
    </div>

    <!-- Modal de Contribuição -->
    <div v-if="mostrarFormContribuicao" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Fazer Contribuição</h3>

        <form @submit.prevent="enviarContribuicao">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                v-model="formContribuicao.nomeContribuidor"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="formContribuicao.emailContribuidor"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
              <input
                v-model.number="formContribuicao.valor"
                type="number"
                min="1"
                step="0.01"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mensagem (opcional)</label>
              <textarea
                v-model="formContribuicao.mensagem"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Deixe uma mensagem de apoio"
              ></textarea>
            </div>

            <div class="flex items-center">
              <input
                v-model="formContribuicao.anonimo"
                type="checkbox"
                id="anonimo"
                class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label for="anonimo" class="ml-2 text-sm text-gray-700">
                Contribuir anonimamente
              </label>
            </div>
          </div>

          <div class="mt-6 flex gap-3">
            <button
              type="button"
              @click="mostrarFormContribuicao = false"
              class="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isEnviandoContribuicao"
              class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
            >
              {{ isEnviandoContribuicao ? 'Enviando...' : 'Contribuir' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Sucesso -->
    <div v-if="mostrarSucesso" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Contribuição Realizada!</h3>
        <p class="text-gray-600 mb-6">Obrigado por apoiar esta vakinha!</p>
        <button
          @click="fecharModalSucesso"
          class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import vakinhaService, { type Vakinha } from '../services/vakinhaService'
import contribuicaoService, { type Contribuicao } from '../services/contribuicaoService'

const route = useRoute()
const router = useRouter()

const vakinha = ref<Vakinha | null>(null)
const contribuicoes = ref<Contribuicao[]>([])
const isLoading = ref(true)
const mostrarFormContribuicao = ref(false)
const mostrarSucesso = ref(false)
const isEnviandoContribuicao = ref(false)

const formContribuicao = reactive({
  nomeContribuidor: '',
  emailContribuidor: '',
  valor: 0,
  mensagem: '',
  anonimo: false
})

const categorias = [
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
  { value: 'emergencia', label: 'Emergência' },
  { value: 'projetos', label: 'Projetos' },
  { value: 'caridade', label: 'Caridade' },
  { value: 'animais', label: 'Animais' },
  { value: 'esportes', label: 'Esportes' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'outros', label: 'Outros' }
]

const getCategoriaLabel = (categoria: string) => {
  const cat = categorias.find(c => c.value === categoria)
  return cat?.label || categoria
}

const formatarMoeda = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calcularPorcentagem = () => {
  if (!vakinha.value) return 0
  return vakinha.value.metaFinanceira > 0 
    ? Math.min(Math.round((vakinha.value.arrecadado! / vakinha.value.metaFinanceira) * 100), 100)
    : 0
}

const formatarDiasRestantes = (dataLimite: string) => {
  const hoje = new Date()
  const limite = new Date(dataLimite)
  const diffTime = limite.getTime() - hoje.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return 'Encerrada'
  } else if (diffDays === 0) {
    return 'Último dia'
  } else if (diffDays === 1) {
    return '1 dia restante'
  } else {
    return `${diffDays} dias restantes`
  }
}

const carregarVakinha = async () => {
  isLoading.value = true
  const id = route.params.id as string

  try {
    vakinha.value = await vakinhaService.getById(id)
    contribuicoes.value = await contribuicaoService.getByVakinha(id)
  } catch (error) {
    console.error('Erro ao carregar vakinha:', error)
    vakinha.value = null
  } finally {
    isLoading.value = false
  }
}

const enviarContribuicao = async () => {
  if (!vakinha.value) return

  isEnviandoContribuicao.value = true

  try {
    await contribuicaoService.create({
      vakinhaId: vakinha.value._id!,
      nomeContribuidor: formContribuicao.nomeContribuidor,
      emailContribuidor: formContribuicao.emailContribuidor,
      valor: formContribuicao.valor,
      mensagem: formContribuicao.mensagem || undefined,
      anonimo: formContribuicao.anonimo
    })

    mostrarFormContribuicao.value = false
    mostrarSucesso.value = true

    // Recarregar dados
    await carregarVakinha()

    // Limpar formulário
    formContribuicao.nomeContribuidor = ''
    formContribuicao.emailContribuidor = ''
    formContribuicao.valor = 0
    formContribuicao.mensagem = ''
    formContribuicao.anonimo = false
  } catch (error: any) {
    console.error('Erro ao enviar contribuição:', error)
    alert(error.response?.data?.message || 'Erro ao enviar contribuição. Tente novamente.')
  } finally {
    isEnviandoContribuicao.value = false
  }
}

const fecharModalSucesso = () => {
  mostrarSucesso.value = false
}

onMounted(() => {
  carregarVakinha()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
