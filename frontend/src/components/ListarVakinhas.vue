<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Vakinhas Ativas
        </h1>
        <p class="text-xl text-gray-600">
          Descubra projetos incríveis e ajude pessoas a realizarem seus sonhos
        </p>
      </div>

      <!-- Filtros -->
      <div class="mb-8 flex flex-wrap gap-4 justify-center">
        <button
          v-for="categoria in categorias"
          :key="categoria.value"
          @click="carregarVakinhas(categoria.value)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            filtroCategoria === categoria.value
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ categoria.label }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-gray-600">Carregando vakinhas...</p>
      </div>

      <!-- Lista de Vakinhas -->
      <div v-else-if="vakinhasFiltradas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="vakinha in vakinhasFiltradas"
          :key="vakinha._id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          @click="verDetalhes(vakinha._id!)"
        >
          <!-- Imagem -->
          <div class="h-48 bg-gray-200 overflow-hidden">
            <img
              v-if="vakinha.imagem"
              :src="vakinha.imagem"
              :alt="vakinha.titulo"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
              <svg class="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="p-6">
            <!-- Categoria -->
            <span class="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full mb-3">
              {{ getCategoriaLabel(vakinha.categoria) }}
            </span>

            <!-- Título -->
            <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {{ vakinha.titulo }}
            </h3>

            <!-- Descrição -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ vakinha.descricao }}
            </p>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">
                  R$ {{ formatarMoeda(vakinha.arrecadado || 0) }}
                </span>
                <span class="text-sm text-gray-500">
                  de R$ {{ formatarMoeda(vakinha.metaFinanceira) }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary-600 h-2 rounded-full transition-all"
                  :style="{ width: `${calcularPorcentagem(vakinha)}%` }"
                ></div>
              </div>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs font-semibold text-primary-600">
                  {{ calcularPorcentagem(vakinha) }}% alcançado
                </span>
                <span v-if="vakinha.dataLimite" class="text-xs text-gray-500">
                  {{ formatarDiasRestantes(vakinha.dataLimite) }}
                </span>
              </div>
            </div>

            <!-- Botão -->
            <button
              @click.stop="verDetalhes(vakinha._id!)"
              class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há vakinhas -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Nenhuma vakinha encontrada</h3>
        <p class="mt-2 text-gray-500">{{ filtroCategoria === 'todas' ? 'Ainda não há vakinhas cadastradas.' : 'Não há vakinhas nesta categoria.' }}</p>
        <router-link to="/criar-vakinha" class="mt-6 inline-block bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium">
          Criar Primeira Vakinha
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import vakinhaService, { type Vakinha } from '../services/vakinhaService'

const router = useRouter()
const filtroCategoria = ref('todas')
const vakinhas = ref<Vakinha[]>([])
const isLoading = ref(false)

const categorias = [
  { value: 'todas', label: 'Todas' },
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
  return new Date(data).toLocaleDateString('pt-BR')
}

const calcularPorcentagem = (vakinha: any) => {
  return vakinha.metaFinanceira > 0 
    ? Math.round((vakinha.arrecadado / vakinha.metaFinanceira) * 100)
    : 0
}

const diasRestantes = (dataLimite: string) => {
  const hoje = new Date()
  const limite = new Date(dataLimite)
  const diffTime = limite.getTime() - hoje.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const formatarDiasRestantes = (dataLimite: string) => {
  const dias = diasRestantes(dataLimite)
  
  if (dias < 0) {
    return 'Encerrada'
  } else if (dias === 0) {
    return 'Último dia'
  } else if (dias === 1) {
    return '1 dia restante'
  } else {
    return `${dias} dias restantes`
  }
}

const vakinhasFiltradas = computed(() => {
  return vakinhas.value
})

const carregarVakinhas = async (categoria: string = 'todas') => {
  isLoading.value = true
  filtroCategoria.value = categoria

  try {
    vakinhas.value = await vakinhaService.getAll(categoria)
  } catch (error) {
    console.error('Erro ao carregar vakinhas:', error)
    alert('Erro ao carregar vakinhas. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}

const verDetalhes = (id: string) => {
  router.push(`/vakinha/${id}`)
}

onMounted(() => {
  carregarVakinhas()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>