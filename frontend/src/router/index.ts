import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CriarUsuario from '../views/CriarUsuario.vue'
import CriarVakinha from '../views/CriarVakinha.vue'
import ListarVakinhas from '../views/ListarVakinhas.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/criar-usuario',
      name: 'criar-usuario',
      component: CriarUsuario,
    },
    {
      path: '/criar-vakinha',
      name: 'criar-vakinha',
      component: CriarVakinha,
    },
    {
      path: '/vakinhas',
      name: 'vakinhas',
      component: ListarVakinhas,
    },
  ],
})

export default router
