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
      <h1>Admin Page</h1>
      <!-- Aquí puedes agregar el contenido de la página de administración -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const userEmail = ref(localStorage.getItem('userEmail') || 'Usuario');
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

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background-color: #03002f;
    color: white;
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

  .content {
    flex: 1;
  }
</style>