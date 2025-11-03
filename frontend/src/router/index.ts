import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CriarUsuarioView from '../views/CriarUsuarioView.vue'
import CriarVakinhaView from '../views/CriarVakinhaView.vue'
import ListarVakinhasView from '../views/ListarVakinhasView.vue'

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
      component: CriarUsuarioView,
    },
    {
      path: '/criar-vakinha',
      name: 'criar-vakinha',
      component: CriarVakinhaView,
    },
    {
      path: '/vakinhas',
      name: 'vakinhas',
      component: ListarVakinhasView,
    },
  ],
})

export default router
