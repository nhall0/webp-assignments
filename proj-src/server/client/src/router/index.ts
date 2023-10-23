import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized  } from 'vue-router';
import { getSession } from '../model/session';

const session = getSession();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/FriendsView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/goals',
      name: 'goals',
      component: () => import('../views/GoalsView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      beforeEnter: requireLogin,
    },
    {
      path: '/workouts',
      name: 'workouts',
      component: () => import('../views/WorkoutsView.vue'),
      beforeEnter: requireLogin,
    }
  ]
});

function requireLogin(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  
  const session = getSession();
  if(!session.user){
    session.redirectUrl = to.fullPath;
    next('/login');
  }else{
    next();
  }
}

export default router;