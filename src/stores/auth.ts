import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'

export interface User {
  id: number
  email: string
  full_name: string
  profile_image?: string
  is_oauth: boolean
  google_id?: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)
  const isRefreshing = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const currentUser = computed(() => user.value)

  // Actions
  const setAuth = (token: string, userData: User) => {
    accessToken.value = token
    user.value = userData
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const clearAuth = () => {
    accessToken.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        accessToken.value = token
        user.value = JSON.parse(userData)
      } catch (error) {
        console.error('Error parsing user data:', error)
        clearAuth()
      }
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    if (isRefreshing.value) return false
    
    try {
      isRefreshing.value = true
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // Important to send cookies
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()
      accessToken.value = data.access_token
      localStorage.setItem('token', data.access_token)
      
      return true
    } catch (error) {
      console.error('Error refreshing token:', error)
      clearAuth()
      return false
    } finally {
      isRefreshing.value = false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      isLoading.value = true
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', // To receive cookies
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      
      // Get user data
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      })

      if (!userResponse.ok) {
        throw new Error('Failed to get user data')
      }

      const userData = await userResponse.json()
      setAuth(data.access_token, userData)
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const loginWithGoogle = () => {
    isLoading.value = true
    const googleAuthUrl = `${import.meta.env.VITE_API_URL}/login/google`
    window.location.href = googleAuthUrl
  }

  const handleGoogleCallback = async (token: string): Promise<boolean> => {
    try {
      if (!token) return false

      // Get full user data
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get user data')
      }

      const userData = await response.json()
      setAuth(token, userData)
      
      return true
    } catch (error) {
      console.error('Google callback error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${accessToken.value}`
        }
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
    }
  }

  const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const makeRequest = async (token: string) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        }
      })
    }

    if (!accessToken.value) {
      throw new Error('No access token available')
    }

    let response = await makeRequest(accessToken.value)

    // If the token expired, try to refresh
    if (response.status === 401 && !isRefreshing.value) {
      const refreshSuccess = await refreshToken()
      
      if (refreshSuccess && accessToken.value) {
        // Try the request with the new token
        response = await makeRequest(accessToken.value)
      }
    }

    return response
  }

  return {
    // State
    user: readonly(user),
    accessToken: readonly(accessToken),
    isLoading: readonly(isLoading),
    isRefreshing: readonly(isRefreshing),
    
    // Getters
    isAuthenticated,
    currentUser,
    
    // Actions
    setAuth,
    clearAuth,
    initAuth,
    refreshToken,
    login,
    loginWithGoogle,
    handleGoogleCallback,
    logout,
    fetchWithAuth
  }
})