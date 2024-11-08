import { ref } from 'vue';

export const isAuthenticated = ref(localStorage.getItem('authenticated') === 'true');

export const login = () => {
  localStorage.setItem('authenticated', 'true');
  isAuthenticated.value = true;
};

export const logout = () => {
  localStorage.removeItem('authenticated');
  isAuthenticated.value = false;
};