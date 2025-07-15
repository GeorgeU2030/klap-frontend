<template>
  <div class="min-h-screen bg-[#080808] flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p class="text-white text-lg">Processing authentication...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    const token = route.query.token as string
    
    if (token) {
      const success = await authStore.handleGoogleCallback(token)
      
      if (success) {
        router.push('/dashboard')
      } else {
        router.push('/login?error=auth_failed')
      }
    } else {
      router.push('/login?error=auth_failed')
    }
  } catch (error) {
    console.error('Auth callback error:', error)
    router.push('/login?error=auth_failed')
  }
})
</script>