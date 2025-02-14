<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Auth from '../components/Auth.vue'
</script>

<template>

  <div class="box">
    <header>
  
      <img alt="Ridery logo" class="logo" src="@/assets/ridery-icon.jpg" width="250" height="250" />

      <div class="wrapper">
        <HelloWorld msg="Administrador de Vehiculos" />
      </div>
    </header>

    <auth></auth>

  </div>

</template>

<style scoped>
  .box {
    max-width: 1024px;
    margin: auto;
    display: block;
  }

  header {
    display: block;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
</style>
