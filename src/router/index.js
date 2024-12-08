import { createRouter, createWebHistory } from 'vue-router';
import { authState, updateAuthStatus, getRedirectRoute } from '../auth.js';
import OrdersPage from '../pages/Orders.vue';
import OrderDetailsPage from '../pages/OrderDetails.vue';
import LoginPage from '../pages/Login.vue';

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
    path: '/orders/:id',
    name: 'Order Details',
    component: OrderDetailsPage,
    meta: { requiresAuth: true }, 
    props: true 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  updateAuthStatus();

  if (to.meta.requiresAuth && !authState.isAuth) {
    // Redirect not authenticated users to the login page if they want to access the orders page
    return next({ name: 'Login' });
  }
  if (to.name === 'Login' && authState.isAuth) {
    // Redirect authenticated users to the orders page if they want to access the login page
    return next({ name: 'Orders' });
  }

  next();
});

export default router;