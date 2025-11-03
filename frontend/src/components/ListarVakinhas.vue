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



    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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