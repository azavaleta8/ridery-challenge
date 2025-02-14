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

  .container {
    font-family: 'Arial', sans-serif;
    color: var(--color-text);
    background-color: var(--color-background);
    height: 100%;
    width: 100%;
    display: flex;
  }

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

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }
</style>
