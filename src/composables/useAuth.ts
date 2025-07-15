// composables/useAuth.ts
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  const user = computed(() => authStore.currentUser)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const isLoading = computed(() => authStore.isLoading)

  const logout = async () => {
    await authStore.logout()
    router.push('/login')
  }

  const requireAuth = () => {
    if (!isAuthenticated.value) {
      router.push('/login')
      return false
    }
    return true
  }

  // Function helper for do authenticated request
  const apiCall = async (endpoint: string, options?: RequestInit) => {
    try {
      const response = await authStore.fetchWithAuth(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        options
      )
      return response
    } catch (error) {
      console.error('API call error:', error)
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    requireAuth,
    apiCall,
    authStore
  }
}