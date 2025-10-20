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
          @click="filtroCategoria = categoria.value"
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

      <!-- Lista de Vakinhas -->
      <div v-if="vakinhasFiltradas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="vakinha in vakinhasFiltradas"
          :key="vakinha.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          @click="verDetalhes(vakinha.id)"
        >
          <!-- Imagem -->
          <div class="h-48 bg-gray-200 overflow-hidden">
            <img
              v-if="vakinha.imagem"
              :src="vakinha.imagem"
              :alt="vakinha.titulo"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="p-6">
            <!-- Categoria -->
            <div class="flex items-center justify-between mb-2">
              <span class="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                {{ getCategoriaLabel(vakinha.categoria) }}
              </span>
              <span class="text-sm text-gray-500">{{ formatarData(vakinha.dataCriacao) }}</span>
            </div>

            <!-- Título -->
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {{ vakinha.titulo }}
            </h3>

            <!-- Descrição -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ vakinha.descricao }}
            </p>

            <!-- Progresso -->
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-700">Arrecadado</span>
                <span class="font-semibold text-primary-600">{{ calcularPorcentagem(vakinha) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: Math.min(calcularPorcentagem(vakinha), 100) + '%' }"
                ></div>
              </div>
              <div class="flex justify-between text-sm mt-1">
                <span class="text-gray-600">R$ {{ formatarMoeda(vakinha.arrecadado) }}</span>
                <span class="text-gray-600">Meta: R$ {{ formatarMoeda(vakinha.metaFinanceira) }}</span>
              </div>
            </div>

            <!-- Informações adicionais -->
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ vakinha.totalContribuicoes }} contribuições</span>
              <span v-if="vakinha.dataLimite" :class="diasRestantes(vakinha.dataLimite) <= 7 ? 'text-red-600' : ''">
                {{ formatarDiasRestantes(vakinha.dataLimite) }}
              </span>
            </div>

            <!-- Responsável -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span class="text-sm font-semibold text-gray-600">
                    {{ vakinha.nomeResponsavel.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="text-sm text-gray-700">{{ vakinha.nomeResponsavel }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado vazio -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Nenhuma vakinha encontrada</h3>
        <p class="mt-2 text-gray-500">
          {{ filtroCategoria === 'todas' ? 'Ainda não há vakinhas cadastradas.' : 'Não há vakinhas nesta categoria.' }}
        </p>
        <div class="mt-6">
          <router-link
            to="/criar-vakinha"
            class="bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Criar a primeira vakinha
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVakinhaStore } from '../stores/vakinha'

const router = useRouter()
const vakinhaStore = useVakinhaStore()

const filtroCategoria = ref('todas')

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

const vakinhasFiltradas = computed(() => {
  if (filtroCategoria.value === 'todas') {
    return vakinhaStore.vakinhas
  }
  return vakinhaStore.vakinhas.filter((v: any) => v.categoria === filtroCategoria.value)
})

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

const verDetalhes = (id: string) => {
  router.push(`/vakinha/${id}`)
}

onMounted(() => {
  vakinhaStore.carregarVakinhas()
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