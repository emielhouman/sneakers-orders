<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { authState, updateAuthStatus } from './auth';

const router = useRouter();

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
      <button v-if="authState.isAuth" @click="handleUserLogout">Logout</button>
    </nav>
    <router-view></router-view> <!-- This is where the routed components will be rendered -->
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>