import { createRouter, createWebHistory } from 'vue-router';
import Orders from '../components/Orders.vue';
import AdminLogin from '../components/adminLogin.vue';

const routes = [
  { path: '/', redirect: '/admin-login' },
  { path: '/admin-login', component: AdminLogin },
  { path: '/orders', component: Orders, meta: { requiresAuth: true } },
  // other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('authenticated') !== 'true') {
      next('/admin-login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;