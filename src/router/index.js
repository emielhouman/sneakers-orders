import { createRouter, createWebHistory } from 'vue-router';
import OrdersPage from '../components/Orders.vue';
import LoginPage from '../pages/Login.vue';
import DetailPage from '../pages/OrderDetail.vue';
import { authState, updateAuthStatus, getRedirectRoute } from '../auth.js';

const routes = [
  {
    path: '/',
    redirect: getRedirectRoute
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersPage,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  
  { path: '/orders/:id', 
    component: DetailPage, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  updateAuthStatus();

  if (to.meta.requiresAuth && !authState.isAuth) {
    // Redirect not authenticated users to the login page if the route requires authentication
    return next({ name: 'Login' });
  }
  if (to.name === 'Login' && authState.isAuth) {
    // Redirect authenticated users away from the login page
    return next({ name: 'Orders' });
  }

  next();
});

export default router;