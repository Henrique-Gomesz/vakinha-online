import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/criar-usuario',
      name: 'criar-usuario',
      component: () => import('../views/CriarUsuario.vue'),
    },
    {
      path: '/criar-vakinha',
      name: 'criar-vakinha',
      component: () => import('../views/CriarVakinha.vue'),
    },
    {
      path: '/vakinhas',
      name: 'vakinhas',
      component: () => import('../views/ListarVakinhas.vue'),
    },
  ],
})

export default router
