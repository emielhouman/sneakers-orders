<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authState, updateAuthStatus } from './auth';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const router = useRouter();
const route = useRoute(); // Access the current route



const handleUserLogout = () => {
  localStorage.removeItem('authToken');
  updateAuthStatus();
  router.push('/login');
};

onMounted(() => {
  updateAuthStatus();
});
</script>

<template>
  <div>
    <nav>
      <router-link v-if="authState.isAuth" to="/orders"></router-link>
      <router-link v-if="!authState.isAuth" to="/login"></router-link>
    </nav>
    <router-view></router-view> <!-- This is where the routed components will be rendered -->
  </div>
</template>

<style scoped>

</style>