<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Realize seus sonhos com<br>
            <span class="hero-highlight">Vakinha Online</span>
          </h1>
          <p class="hero-subtitle">
            Crie vakinhas, arrecade fundos e transforme ideias em realidade
          </p>
          <div class="hero-buttons">
            <router-link to="/criar-vakinha" class="btn btn-yellow">
              Criar Vakinha
            </router-link>
            <router-link to="/vakinhas" class="btn btn-outline">
              Ver Vakinhas
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Pronto para começar?</h2>
          <p class="cta-subtitle">
            Junte-se a milhares de pessoas que já realizaram seus sonhos
          </p>
          <router-link to="/criar-usuario" class="btn btn-primary btn-lg">
            Cadastrar Agora
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>


.hero {
  background: linear-gradient(to right, var(--primary-600), var(--primary-800));
  color: #ffffff;
  padding: 5rem 0;
}

.hero-content {
  text-align: center;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem;
  }
}

.hero-highlight {
  color: var(--yellow-300);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--primary-100);
  line-height: 1.5;
}

@media (min-width: 768px) {
  .hero-subtitle {
    font-size: 1.5rem;
  }
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

@media (min-width: 640px) {
  .hero-buttons {
    flex-direction: row;
    justify-content: center;
  }
}

.features {
  padding: 4rem 0;
}

.features-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 2.25rem;
  }
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  text-align: center;
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  background-color: var(--primary-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.feature-description {
  color: var(--gray-600);
  line-height: 1.5;
}

/* Stats Section */
.stats {
  background-color: var(--gray-100);
  padding: 4rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: center;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--primary-600);
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .stat-number {
    font-size: 2.25rem;
  }
}

.stat-label {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.cta {
  padding: 4rem 0;
}

.cta-content {
  text-align: center;
  max-width: 56rem;
  margin: 0 auto;
}

.cta-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .cta-title {
    font-size: 2.25rem;
  }
}

.cta-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.btn-lg {
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
}
</style>
