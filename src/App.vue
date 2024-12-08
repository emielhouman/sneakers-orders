<script setup>
import { onMounted } from 'vue';
import { authState, updateAuthStatus } from './auth';

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