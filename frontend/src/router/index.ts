import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Ruta protegida
    if (!token) {
      next({ name: '' });
    } else {
      next();
    }
  } else if ((to.name === 'home') && token) {
    // Redirigir a admin si el usuario ya está autenticado
    next({ name: 'admin' });
  } else {
    next();
  }
});

export default router;