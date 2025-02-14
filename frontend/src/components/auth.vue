<template>
  <div class="auth">
    <h1>{{ isLogin ? 'Iniciar Sesión' : 'Registro' }}</h1>

    <form @submit.prevent="handleSubmit">
      <div>
        <input type="email" id="email" v-model="email" required placeholder="Correo Electrónico"/>
      </div>
      <div>
        <input type="password" id="password" v-model="password" required placeholder="Contraseña"/>
      </div>
      <button type="submit">{{ isLogin ? 'Iniciar Sesión' : 'Registrate' }}</button>
    </form>

    <nav>
      <RouterLink to="/" @click.prevent="toggleAuthMode">{{ isLogin ? 'Registro' : 'Iniciar Sesión' }}</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { login, register } from '../services/authService';
  import { useToast } from "vue-toastification";

  const email = ref('');
  const password = ref('');
  const isLogin = ref(true);
  const router = useRouter();
  const toast = useToast();


  const handleSubmit = async () => {
    try {
      if (isLogin.value) {
        const response = await login(email.value, password.value);
        toast.success('Inicio de sesión exitoso');
        console.log('Login successful:', response);
        router.push('/');
      } else {
        const response = await register(email.value, password.value);
        toast.success('Registro exitoso');
        console.log('Registration successful:', response);
        isLogin.value = true;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const toggleAuthMode = () => {
    isLogin.value = !isLogin.value;
  };
</script>

<style scoped>
  .auth {
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .auth h1 {
    text-align: center;
    height: auto;
    padding: 10px;
  }

  .auth form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    width: 100%;
    margin: auto;
  }

  .auth form div {
    margin-bottom: 1rem;
  }

  .auth form label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .auth form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .auth form button {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
  }

  .auth form button:hover {
    background-color: #369f6e;
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