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
      <router-link v-if="authState.isAuth" to="/components/orders"></router-link>
      <router-link v-if="!authState.isAuth" to="/login"></router-link>
    </nav>
    <nav class="navbar">
      <!-- Add the Logout button -->
      <button v-if="authState.isAuth" class="logout-button" @click="handleUserLogout">
        Logout
      </button>
    </nav>
    <router-view></router-view> <!-- This is where the routed components will be rendered -->
  </div>
</template>

<style scoped>

/* Logout button styling */
button {
  background-color: #e63946; /* Red background */
  color: #fff; /* White text */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  padding: 8px 15px; /* Button padding */
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

/* Hover effect */
button:hover {
  background-color: #d62828; /* Darker red on hover */
  transform: scale(1.05); /* Slightly larger */
}

/* Active button effect */
button:active {
  background-color: #b91c1c; /* Even darker red */
  transform: scale(0.98); /* Slightly smaller */
}

/* Focus state for accessibility */
button:focus {
  outline: 2px solid #0056b3; /* Blue outline for focus */
  outline-offset: 2px;
}
</style>