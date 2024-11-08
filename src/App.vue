<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated, logout } from './auth';

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/admin-login');
};
</script>

<template>
  <div>
    <nav>
      <router-link v-if="isAuthenticated" to="/orders"></router-link>
      <router-link v-if="!isAuthenticated" to="/admin-login"></router-link>
      <button v-if="isAuthenticated" @click="handleLogout">Logout</button>
    </nav>
    <router-view></router-view> <!-- This is where the routed components will be rendered -->
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>