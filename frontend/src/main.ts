import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useUsuarioStore } from './stores/usuario'
import { useVakinhaStore } from './stores/vakinha'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Carregar dados iniciais das stores
const usuarioStore = useUsuarioStore()
const vakinhaStore = useVakinhaStore()

usuarioStore.carregarDadosLocal()
vakinhaStore.carregarVakinhas()

app.mount('#app')
