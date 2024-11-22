import { reactive } from 'vue';

export const authState = reactive({
  isAuth: !!localStorage.getItem('authToken')
});

export function updateAuthStatus() {
  authState.isAuth = !!localStorage.getItem('authToken');
}

export function getRedirectRoute() {
  return authState.isAuth ? '/orders' : '/login';
}