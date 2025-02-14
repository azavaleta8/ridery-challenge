<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  // Aquí puedes agregar la lógica para autenticar al usuario
  // Por ejemplo, hacer una solicitud a tu API de backend
  console.log('Email:', email.value);
  console.log('Password:', password.value);

  // Simulación de autenticación exitosa
  if (email.value === 'user@example.com' && password.value === 'password') {
    // Redirigir al usuario a la página de inicio después de iniciar sesión
    router.push('/');
  } else {
    alert('Invalid credentials');
  }
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login h1 {
  text-align: center;
}

.login form {
  display: flex;
  flex-direction: column;
}

.login form div {
  margin-bottom: 1rem;
}

.login form label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.login form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login form button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

.login form button:hover {
  background-color: #369f6e;
}
</style>
