<template>
  <div class="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
    
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-700 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Main form container with glassmorphism -->
      <div class="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-8 relative overflow-hidden">
        <!-- Subtle gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-2xl blur opacity-20"></div>
        
        <div class="relative z-10">
          
          <!-- Header section -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LockIcon class="w-8 h-8 text-white" />
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p class="text-gray-400">Sign in to your account</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            
            <!-- Error message with improved styling -->
            <div v-if="authError" class="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg backdrop-blur-sm flex items-center">
              <AlertCircleIcon class="w-5 h-5 mr-3 flex-shrink-0" />
              <span class="text-sm">{{ authError }}</span>
            </div>

            <!-- Email field -->
            <div class="space-y-2">
              <Label for="email" class="block text-sm font-medium text-gray-300">
                Email
              </Label>
              <div class="relative">
                <MailIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  :disabled="authStore.isLoading"
                  class="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <!-- Password field -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <Label for="password" class="block text-sm font-medium text-gray-300">
                  Password
                </Label>
              </div>
              <div class="relative">
                <LockIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="••••••••"
                  :disabled="authStore.isLoading"
                  class="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  @click="showPassword = !showPassword"
                  :disabled="authStore.isLoading"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors h-auto p-0 disabled:opacity-50"
                >
                  <EyeOffIcon v-if="showPassword" class="w-5 h-5" />
                  <EyeIcon v-else class="w-5 h-5" />
                </Button>
              </div>
            </div>

            <!-- Login button -->
            <Button
              type="submit"
              :disabled="authStore.isLoading"
              class="w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-purple-700 to-cyan-600 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 duration-200 disabled:opacity-50 relative overflow-hidden"
            >
              <div v-if="authStore.isLoading" class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
              <span v-else class="flex items-center justify-center">
                <LogInIcon class="w-5 h-5 mr-2" />
                Sign in
              </span>
            </Button>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-600"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-gray-900/50 text-gray-400">or continue with</span>
              </div>
            </div>

            <!-- Google login button -->
            <Button
              type="button"
              @click="handleGoogleLogin"
              :disabled="authStore.isLoading"
              variant="outline"
              class="w-full cursor-pointer py-3 px-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-gray-300"
            >
              <div v-if="authStore.isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
              <template v-else>
                <img src="@/assets/images/google.webp" alt="Google" class="w-5 h-5 mr-2">
                Sign In with Google
              </template>
            </Button>
          </form>

          <!-- Footer -->
          <div class="mt-8 text-center">
            <p class="text-gray-400 text-sm">
              Don't have an account?
              <a
                href="#"
                class="text-cyan-400 hover:text-cyan-300 transition-colors font-medium ml-1"
                @click.prevent="handleSignUp"
              >
                Sign up here
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LockIcon, LogInIcon, MailIcon, EyeIcon, EyeOffIcon, AlertCircleIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const showPassword = ref(false)

// Form data
const formData = ref({
  email: '',
  password: ''
})

const authError = ref('')

const clearErrors = () => {
  authError.value = ''
}

const validateForm = (): boolean => {
  clearErrors()
  
  if (!formData.value.email || !formData.value.password) {
    authError.value = 'Please fill in all fields'
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    authError.value = 'Please enter a valid email address'
    return false
  }
  
  return true
}

const handleLogin = async (): Promise<void> => {
  if (!validateForm()) return
  
  clearErrors()
  
  try {
    const success = await authStore.login(
      formData.value.email.trim(),
      formData.value.password
    )
    
    if (success) {
      router.push('/dashboard')
    } else {
      authError.value = 'Invalid email or password'
    }
  } catch (error) {
    console.error('Login error:', error)
    authError.value = 'An error occurred during login'
  }
}

const handleGoogleLogin = (): void => {
  clearErrors()
  authStore.loginWithGoogle()
}

const handleSignUp = (): void => {
  clearErrors()
  router.push('/register')
}

// Handle URL error parameters
onMounted(() => {
  const error = route.query.error as string
  
  if (error) {
    switch (error) {
      case 'email_exists_traditional':
        authError.value = 'This email is already registered with a traditional account. Please use email/password login.'
        break
      case 'auth_failed':
        authError.value = 'Authentication failed. Please try again.'
        break
      default:
        authError.value = 'An error occurred during authentication.'
    }
  }
})
</script>