import { reactive } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const authState = reactive({
  isAuth: !!localStorage.getItem('authToken')
});

export function updateAuthStatus() {
  authState.isAuth = !!localStorage.getItem('authToken');
}

export function getRedirectRoute() {
  return authState.isAuth ? '/orders' : '/login';
}

export function getEmailFromToken() {
  const token = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(token);
  return decodedToken.email;
}