<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="logo">
            🪙 Vakinha Online
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="nav-desktop">
          <router-link to="/" class="nav-link">
            Início
          </router-link>
          <router-link to="/vakinhas" class="nav-link">
            Vakinhas
          </router-link>
          <router-link to="/criar-vakinha" class="btn btn-primary">
            Criar Vakinha
          </router-link>
          <router-link to="/criar-usuario" class="nav-link">
            Cadastrar
          </router-link>
        </nav>

        <!-- Mobile menu button -->
        <div class="nav-mobile-button">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="mobile-menu-btn">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="nav-mobile">
        <div class="nav-mobile-content">
          <router-link to="/" @click="isMobileMenuOpen = false" class="nav-mobile-link">
            Início
          </router-link>
          <router-link to="/vakinhas" @click="isMobileMenuOpen = false" class="nav-mobile-link">
            Vakinhas
          </router-link>
          <router-link to="/criar-vakinha" @click="isMobileMenuOpen = false" class="nav-mobile-link btn-primary">
            Criar Vakinha
          </router-link>
          <router-link to="/criar-usuario" @click="isMobileMenuOpen = false" class="nav-mobile-link">
            Cadastrar
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--gray-200);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-600);
  text-decoration: none;
  transition: var(--transition);
}

.logo:hover {
  color: var(--primary-700);
}

.nav-desktop {
  display: none;
  gap: 2rem;
}

@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
    align-items: center;
  }
}

.nav-link {
  color: var(--gray-700);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary-600);
}

.nav-mobile-button {
  display: block;
}

@media (min-width: 768px) {
  .nav-mobile-button {
    display: none;
  }
}

.mobile-menu-btn {
  color: var(--gray-700);
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: var(--transition);
}

.mobile-menu-btn:hover {
  color: var(--primary-600);
}

.nav-mobile {
  display: block;
}

@media (min-width: 768px) {
  .nav-mobile {
    display: none;
  }
}

.nav-mobile-content {
  padding: 0.5rem 0.5rem 0.75rem 0.5rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-mobile-link {
  display: block;
  color: var(--gray-700);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  transition: var(--transition);
}

.nav-mobile-link:hover {
  color: var(--primary-600);
}

.nav-mobile-link.btn-primary {
  background-color: var(--primary-600);
  color: #ffffff;
}

.nav-mobile-link.btn-primary:hover {
  background-color: var(--primary-700);
  color: #ffffff;
}
</style>