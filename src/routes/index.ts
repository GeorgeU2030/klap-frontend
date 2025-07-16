import { createRouter, createWebHistory } from 'vue-router'

import HomePage from "@/pages/HomePage.vue";
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue"
import AuthCallback from "@/pages/AuthCallBack.vue"
import Dashboard from "@/pages/Dashboard.vue"
import SearchItem from "@/pages/SearchItem.vue"
import { useAuthStore } from '@/stores/auth'
import MovieDetail from "@/components/movie/MovieDetail.vue";

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
        meta: { requiresGuest: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresGuest: true }
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/auth/callback',
        name: 'AuthCallback',
        component: AuthCallback,
        meta: { requiresGuest: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/search',
        name: 'Search',
        component: SearchItem,
        meta: { requiresAuth: true }
    },
    {
        path: '/detail/:type/:id',
        name: 'movie-detail',
        component: MovieDetail,
        meta: { requiresAuth: true }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore()
    
    // Initialize auth if not initialized
    if (!authStore.isAuthenticated) {
      authStore.initAuth()
    }
  
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      if (!authStore.isAuthenticated) {
        // If not authenticated, try to refresh the token
        const refreshSuccess = await authStore.refreshToken()
        
        if (!refreshSuccess) {
          // If the token couldn't be refreshed, redirect to login
          next('/login')
          return
        }
      }
      
      // If authenticated, allow access
      next()
      return
    }
  
    // Check if the route requires being a guest (not authenticated)
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      next('/dashboard')
      return
    }
  
    next()
})
  