<template>
  <div class="login-container">
    <h1>Admin Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, isAuthenticated } from '../auth';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  // Simulate authentication
  if (username.value === 'admin' && password.value === 'password') {
    login();
    router.push('/orders');
  } else {
    alert('Invalid credentials');
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>