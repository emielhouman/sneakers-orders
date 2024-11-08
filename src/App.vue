<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(localStorage.getItem('authenticated') === 'true');
const router = useRouter();

const logout = () => {
  localStorage.removeItem('authenticated');
  isAuthenticated.value = false;
  router.push('/admin-login');
};
</script>

<template>
  <div>
    <nav>
      <router-link v-if="isAuthenticated" to="/orders">Orders</router-link>
      <router-link to="/admin-login">Admin Login</router-link>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
    <router-view></router-view> <!-- This is where the routed components will be rendered -->
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>