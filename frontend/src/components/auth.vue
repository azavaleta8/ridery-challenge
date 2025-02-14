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

  const email = ref('');
  const password = ref('');
  const isLogin = ref(true);
  const router = useRouter();

  const handleSubmit = async () => {
    // Aquí puedes agregar la lógica para autenticar o registrar al usuario
    // Por ejemplo, hacer una solicitud a tu API de backend
    console.log('Email:', email.value);
    console.log('Password:', password.value);

    if (isLogin.value) {
      // Simulación de autenticación exitosa
      if (email.value === 'user@example.com' && password.value === 'password') {
        // Redirigir al usuario a la página de inicio después de iniciar sesión
        router.push('/');
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Simulación de registro exitoso
      alert('Registro exitoso');
      isLogin.value = true;
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