<template>
  <div class="admin">
    <nav class="navbar">
      <div class="navbar-left">
        <span>{{ userEmail }}</span>
      </div>
      <div class="navbar-right">
        <button @click="logout">Cerrar Sesión</button>
      </div>
    </nav>
    <div class="content">
      <Dashboard></Dashboard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Dashboard from '../components/Dashboard.vue';
  import {jwtDecode} from 'jwt-decode';

  
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode<{ email: string }>(token);
  const userEmail = ref(decodedToken.email || 'Usuario');
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    router.push('/');
  };
</script>

<style scoped>
  .admin {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .content {
    height: calc(100% - 80px);
    width: 100%;
    display: flex;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background-color: #b0e4bc;
    color: black;
    padding: 0 20px;
  }

  .navbar-left {
    font-size: 1.2rem;
  }

  .navbar-right button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #ff4d4d;
    color: white;
    cursor: pointer;
  }

  .navbar-right button:hover {
    background-color: #ff1a1a;
  }
  
</style>