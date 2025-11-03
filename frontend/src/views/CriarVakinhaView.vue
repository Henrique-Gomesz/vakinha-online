<template>
      <CriarVakinha />
</template>
  
import CriarVakinhaView from '../views/CriarVakinhaView.vue'

<script>
    import CriarVakinha from '../components/CriarVakinha.vue';
    
    export default {
        name: 'CriarVakinhaView',
        components: {
            CriarVakinha
        }
    }
</script>