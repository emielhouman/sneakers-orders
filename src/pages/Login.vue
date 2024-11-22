<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { updateAuthStatus } from '../auth.js';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleUserLogin = async () => {
  try {
    const response = await fetch('https://sneakers-api-ouat.onrender.com/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email.value,
          password: password.value,
        },
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authToken', data.data.token);
      updateAuthStatus();
      router.push('/orders');
    } else {
      console.error('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Welcome back!</h1>
    <form @submit.prevent="handleUserLogin">
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
