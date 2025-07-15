<template>
  <div class="min-h-screen bg-[#080808]">
    
    <header class="bg-gray-900 border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          </div>
          
          <div class="flex items-center space-x-4">

            <div class="hidden md:flex items-center gap-6">
              <form @submit.prevent="onSearch" class="relative group">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search class="h-4 w-4 text-gray-400 transition-colors" />
                </div>
                <input v-model="query" type="text" placeholder="Search..."
                  class="px-2 pr-4 py-2 rounded-lg text-white placeholder-gray-400 w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-violet-800 hover:border-violet-700 transition-all" />
              </form>
            </div>
            
            <div v-if="authStore.currentUser" class="flex items-center space-x-3">
              <div class="flex items-center space-x-2">
                <img 
                  v-if="authStore.currentUser.profile_image" 
                  :src="authStore.currentUser.profile_image" 
                  :alt="authStore.currentUser.full_name"
                  class="w-8 h-8 rounded-full"
                />
                <div v-else class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ authStore.currentUser?.full_name?.charAt(0)?.toUpperCase() ?? '' }}
                  </span>
                </div>
                <div class="hidden sm:block">
                  <p class="text-sm text-white">{{ authStore.currentUser.full_name }}</p>
                  <p class="text-xs text-gray-400">{{ authStore.currentUser.email }}</p>
                </div>
              </div>
            </div>
            
            <button
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-colors disabled:opacity-50"
            >
              <span v-if="isLoggingOut">Logging out...</span>
              <span v-else>
                <LogOut class="h-4 w-4 " />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LogOut } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const isLoggingOut = ref(false)
const isTestingApi = ref(false)
const apiTestResult = ref<string | null>(null)

const handleLogout = async () => {
  try {
    isLoggingOut.value = true
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    isLoggingOut.value = false
  }
}

const query = ref('')

const onSearch = () => {
    if (!query.value.trim()) return
    router.push({ path: '/search', query: { query: query.value } })
}

const testApiCall = async () => {
  try {
    isTestingApi.value = true
    apiTestResult.value = null
    
    // Test an authenticated API call
    const response = await authStore.fetchWithAuth(`${import.meta.env.VITE_API_URL}/user/me`)
    
    if (response.ok) {
      const data = await response.json()
      apiTestResult.value = JSON.stringify(data, null, 2)
    } else {
      apiTestResult.value = `Error: ${response.status} ${response.statusText}`
    }
  } catch (error) {
    console.error('API test error:', error)
    apiTestResult.value = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
  } finally {
    isTestingApi.value = false
  }
}
</script>