<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { updateAuthStatus } from '../auth.js';

const router = useRouter();

const email = ref('');
const password = ref('');

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
    <div class="login-card">
      <h1>Welcome back!</h1>
      <form @submit.prevent="handleUserLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Sign In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Container for the login page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  background-image: linear-gradient(to bottom right, #e3f2fd, #f9f9f9);
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

/* Login card styling */
.login-card {
  background-color: #fff;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Header */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Form styling */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Form group for inputs */
.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease-in-out;
  background-color: #f9f9f9;
}

input:focus {
  outline: none;
  border-color: #69FF47;
}

/* Sign In button */
.login-button {
  background-color: #69FF47;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

</style>