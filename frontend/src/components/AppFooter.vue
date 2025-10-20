<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- About -->
        <div>
          <h3 class="footer-title">Vakinha Online</h3>
          <p class="footer-text">
            Plataforma para criação de vakinhas online de forma simples e segura.
            Ajude pessoas a realizarem seus sonhos e projetos.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="footer-title">Links Úteis</h3>
          <ul class="footer-links">
            <li>
              <router-link to="/" class="footer-link">Início</router-link>
            </li>
            <li>
              <router-link to="/vakinhas" class="footer-link">Vakinhas</router-link>
            </li>
            <li>
              <router-link to="/criar-vakinha" class="footer-link">Criar Vakinha</router-link>
            </li>
            <li>
              <router-link to="/criar-usuario" class="footer-link">Cadastrar</router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="footer-title">Contato</h3>
          <div class="footer-contact">
            <p>📧 contato@vakinhaonline.com</p>
            <p>📱 (11) 99999-9999</p>
            <div class="footer-social">
              <a href="#" class="footer-link">
                <span class="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" class="footer-link">
                <span class="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" class="footer-link">
                <span class="sr-only">Twitter</span>
                🐦
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} Vakinha Online. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: var(--gray-800);
  color: #ffffff;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 0;
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-text {
  color: var(--gray-300);
  font-size: 0.875rem;
  line-height: 1.5;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: var(--gray-300);
  text-decoration: none;
  font-size: 0.875rem;
  transition: var(--transition);
}

.footer-link:hover {
  color: #ffffff;
}

.footer-contact {
  font-size: 0.875rem;
  color: var(--gray-300);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.footer-bottom {
  border-top: 1px solid var(--gray-700);
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
}

.footer-copyright {
  font-size: 0.875rem;
  color: var(--gray-300);
}
</style>